// ZAAAA WAAAARUDO!

import { TIMELINE_UNLOCK_COST } from "@common/constants";
import { EffectService } from "@common/utils";
import { WORLD_PORT } from "@server/servers";

import { SettingsManager } from "@server/settings";
import { getDefaultPenguin, PenguinRepository } from "@server/database/database";
import { GameData } from "@server/timelines/game-data";

import { ClientSocket, MessageHandler, setupSocketServer } from "./socket-server";

import { PenguinMessenger } from "@server/socket-server/messenger";

import { World } from "./world/world";
import { WorldPenguin } from "./world/world-penguin";

import { addBakeryListener } from "./handlers/party";
import { addMatchmakerListeners } from "./handlers/ninja";

import { XtHandler } from "./xt-handler";
import { XmlHandler } from "./xml-handler";
import { createWorldXtHandler } from "./world-handlers";
import { createLoginXmlHandler } from "./login-handlers";
import { PenguinPersister, WorldContext } from "@server/socket-server/handlers/handlers";
import { CommandsHandler, getCommandsHandler } from "@server/commands/commands";
import { OfflineWorld } from "./offline-world";
import { NpcService, NPC_ID_START } from "./world/npc-service";
import { ITEMS } from "@server/game-logic/items";
import { ROOMS, TIME_HUB_ROOM_ID } from "@server/game-data/rooms";
import { UPDATES } from "@server/updates/updates";
import { isGreater, Version } from "@server/routes/versions";
import { joinRoom, sendLPMessage } from "./handlers/join";
import { STORY_QUESTS, TIMELINE_ACHIEVEMENTS } from "@server/game-data/story-progress";

const INITIAL_TIMELINE_UNLOCKED: Version = '2006-06-06';

export class WorldServer implements MessageHandler {
  private _world: World;
  private _msg = new PenguinMessenger();
  private _off: OfflineWorld;
  private _commandsHandler: CommandsHandler;
  private _xtHandler: XtHandler;
  private _xmlHandler: XmlHandler;
  private _persister: PenguinPersister;
  private _npcs: NpcService;
  private _timelineUnlocking = false;
  private _hubRequestListeners = new Set<(penguinId: number) => void>();
  private _timelineRequestListeners = new Set<(penguinId: number) => void>();
  private _journalRequestListeners = new Set<(penguinId: number) => void>();
  private _timelineAdvanceListeners = new Set<() => void>();
  
  constructor(private _settings: SettingsManager, private _gameData: GameData, private _db: PenguinRepository) {
    this._off = new OfflineWorld(_db);
    this._world = new World(_gameData);
    this._npcs = new NpcService(this._world, this._msg, this._gameData, this._settings, {
      getNextEra: () => this.getNextEra(),
      advanceToNextEra: (penguin) => this.advanceTimeline(penguin),
      travelToHub: (penguin) => this.travelToHub(penguin),
      requestTravelToHub: (penguinId) => this.requestTravelToHub(penguinId),
      openTimeline: (penguinId) => this.openTimeline(penguinId),
      openJournal: (penguinId) => this.openJournal(penguinId)
    });

    this._commandsHandler = getCommandsHandler();

    this._persister = (p, force = false) => { 
      if (p.canSave || force) {
        this._db.write(p.id, p.getJSON());
      }
    };

    this._xtHandler = createWorldXtHandler();
    this._xmlHandler = createLoginXmlHandler();

    this.init();
  }

  public addHubRequestListener(callback: (penguinId: number) => void): void {
    this._hubRequestListeners.add(callback);
  }

  private requestTravelToHub(penguinId: number): void {
    this._hubRequestListeners.forEach(callback => callback(penguinId));
  }

  public addTimelineRequestListener(callback: (penguinId: number) => void): void {
    this._timelineRequestListeners.add(callback);
  }

  public addJournalRequestListener(callback: (penguinId: number) => void): void {
    this._journalRequestListeners.add(callback);
  }

  public addTimelineAdvanceListener(callback: () => void): void {
    this._timelineAdvanceListeners.add(callback);
  }

  private openTimeline(penguinId: number): void {
    this._timelineRequestListeners.forEach(callback => callback(penguinId));
  }

  private openJournal(penguinId: number): void {
    this._journalRequestListeners.forEach(callback => callback(penguinId));
  }

  public getPenguinCoins(penguinId: number): number | undefined {
    return this._world.getById(penguinId)?.currency.coins;
  }

  public travelToHubById(penguinId: number): void {
    const penguin = this._world.getById(penguinId);
    if (penguin !== undefined) {
      this.travelToHub(penguin);
    }
  }

  public async advanceTimelineById(penguinId: number): Promise<string> {
    const penguin = this._world.getById(penguinId);
    if (penguin === undefined) {
      return 'penguin is no longer connected';
    }

    return this.advanceTimeline(penguin);
  }

  public async resetProgressById(penguinId: number): Promise<string> {
    const penguin = this._world.getById(penguinId);
    if (penguin === undefined) {
      return 'penguin is no longer connected';
    }

    const previous = penguin.getJSON();
    const reset = getDefaultPenguin(
      penguin.name,
      penguin.inventory.color,
      this._settings.settings.always_member,
      previous.virtualRegistrationTimestamp
    );
    reset.registration_date = previous.registration_date;

    penguin.preference.disableSave();
    await this._db.write(penguinId, reset);
    const start = UPDATES[0].date;
    this._settings.updateSettings({ version: start, timeline_unlocked: INITIAL_TIMELINE_UNLOCKED, game_mode: 'timeline', timeline_progression: true });
    await this.reset();
    this._timelineAdvanceListeners.forEach(callback => callback());
    return 'timeline and penguin progress reset';
  }

  public getNextEra(): Version | undefined {
    if (!this._settings.settings.timeline_progression) {
      return undefined;
    }

    const unlocked = this._settings.settings.timeline_unlocked;
    return UPDATES.find(update => isGreater(update.date, unlocked))?.date;
  }

  public travelToHub(penguin: WorldPenguin): void {
    const client = this._msg.getClient(penguin);
    const room = this._world.getPenguinRoom(penguin);
    if (client === undefined || room?.id === TIME_HUB_ROOM_ID) {
      return;
    }
    const context = this.getContext(client);
    if ('penguin' in context) {
      joinRoom(context, TIME_HUB_ROOM_ID, 320, 240);
    }
  }

  public async advanceTimeline(penguin: WorldPenguin): Promise<string> {
    if (!this._settings.settings.timeline_progression) {
      return 'timeline progression is disabled. every era is already available';
    }

    const next = this.getNextEra();
    if (next === undefined) {
      return 'all recorded eras are already unlocked';
    }
    if (this._timelineUnlocking) {
      return 'the time machine is already charging';
    }
    if (penguin.currency.coins < TIMELINE_UNLOCK_COST) {
      return `you need ${TIMELINE_UNLOCK_COST - penguin.currency.coins} more coins to unlock ${next}`;
    }

    this._timelineUnlocking = true;
    penguin.currency.discount(TIMELINE_UNLOCK_COST);
    this._persister(penguin);
    await sendLPMessage(penguin, this._gameData, this._msg);
    penguin.unlockAchievement('time-traveler');
    this._persister(penguin);
    this._settings.updateSettings({ timeline_unlocked: next, version: next });
    setTimeout(() => {
      this._timelineUnlocking = false;
      void this.reset().then(() => {
        this._timelineAdvanceListeners.forEach(callback => callback());
      });
    }, 2200);

    return `era ${next} unlocked for ${TIMELINE_UNLOCK_COST} coins. travelling now`;
  }

  public runCommand(penguinId: number, name: string, args: string[]) {
    const penguin = this._world.getById(penguinId);
    if (penguin !== undefined) {
      const client = this._msg.getClient(penguin);
      this._commandsHandler.run({
        world: this._world,
        penguin,
        prst: this._persister,
        msg: this._msg,
        data: this._gameData,
        db: this._db,
        settings: this._settings,
        off: this._off,
        npcs: this._npcs,
        client,
        room: this._world.getPenguinRoom(penguin)
      }, name, args);
    }
  }

  public getAllPlayersInfo() {
    return this._world.players
      .filter(p => p.id < NPC_ID_START)
      .map(p => ({
        name: p.name,
        id: p.id
      }));
  }

  public async getJournalData(penguinId: number | undefined) {
    const connected = penguinId === undefined ? undefined : this._world.getById(penguinId);
    const json = connected?.getJSON() ?? (penguinId === undefined ? null : await this._db.get(penguinId));
    const visitedRooms = json?.visitedRooms ?? [];
    const completedQuests = new Set(json?.questsCompleted ?? []);
    const unlockedAchievements = new Set(json?.achievementsUnlocked ?? []);

    return {
      playerName: json?.name ?? 'No penguin connected',
      coins: json?.coins ?? 0,
      currentEra: this._settings.settings.version,
      unlockedEra: this._settings.settings.timeline_unlocked,
      progression: this._settings.settings.timeline_progression,
      visitedRooms,
      quests: STORY_QUESTS.map(quest => ({
        ...quest,
        available: quest.era <= this._settings.settings.version,
        complete: completedQuests.has(quest.id),
        progress: quest.rooms.filter(room => visitedRooms.includes(room)).length
      })),
      achievements: TIMELINE_ACHIEVEMENTS.map(achievement => ({
        ...achievement,
        unlocked: unlockedAchievements.has(achievement.id)
      })),
      questCount: STORY_QUESTS.length,
      completedQuestCount: STORY_QUESTS.filter(quest => completedQuests.has(quest.id)).length,
      unlockedAchievementCount: TIMELINE_ACHIEVEMENTS.filter(achievement => unlockedAchievements.has(achievement.id)).length,
      totalAchievementCount: TIMELINE_ACHIEVEMENTS.length
    };
  }

  public getTrainerData() {
    return {
      players: this.getAllPlayersInfo(),
      items: ITEMS.rows.map(item => ({
        id: item.id,
        name: item.name,
        type: item.type,
        member: item.isMember
      })),
      stamps: this._gameData.getStampbook().flatMap(category => {
        return category.stamps.map(stamp => ({
          id: stamp.stamp_id,
          name: stamp.name,
          category: category.name,
          rank: stamp.rank_token
        }));
      }),
      rooms: Object.values(ROOMS).map(room => ({
        id: room.id,
        name: room.name
      }))
    };
  }

  private init() {
    addBakeryListener(this._world, this._msg);
    addMatchmakerListeners(this._world, this._msg);
    this._npcs.start();
  }

  public async reset() {
    this._npcs.stop();
    await Promise.all(this._msg.getClients().map(client => this.disconnect(client)));
    this._msg.close();
    this._msg = new PenguinMessenger();
    this._world = new World(this._gameData);
    this._npcs = new NpcService(this._world, this._msg, this._gameData, this._settings, {
      getNextEra: () => this.getNextEra(),
      advanceToNextEra: (penguin) => this.advanceTimeline(penguin),
      travelToHub: (penguin) => this.travelToHub(penguin),
      requestTravelToHub: (penguinId) => this.requestTravelToHub(penguinId),
      openTimeline: (penguinId) => this.openTimeline(penguinId),
      openJournal: (penguinId) => this.openJournal(penguinId)
    });
    this.init();
  }

  private getContext(client: ClientSocket): WorldContext {
    const penguin = this._msg.getPenguin(client);
    return {
      world: this._world,
      msg: this._msg,
      data: this._gameData,
      settings: this._settings,
      db: this._db,
      prst: this._persister,
      off: this._off,
      npcs: this._npcs,

      client,

      ...(penguin === undefined ? {} : {
        penguin, ...this._world.getContext(penguin)
      })
    };
  }

  public handle(client: ClientSocket, message: string): void {
    if (message.startsWith('<')) {
      this._xmlHandler.handle({ 
        msg: this._msg,
        data: this._gameData,
        settings: this._settings,
        db: this._db,
        off: this._off,
        client,
        world: this._world
      }, message);
    } else {
      this._xtHandler.handle(client, this.getContext(client), message);
    }
  }

  public async disconnect(client: ClientSocket): Promise<void> {
    const context = this.getContext(client);
    await this._xtHandler.disconnect(context);
  }
}

export const setupWorldServer = async (settings: SettingsManager, db: PenguinRepository, gameData: GameData): Promise<EffectService<WorldServer>> => {
  const world = new WorldServer(settings, gameData, db);
  await setupSocketServer('world', WORLD_PORT, world);
  return world;
}
