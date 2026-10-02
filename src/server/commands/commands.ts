import { ArgumentsIndicator, GetArgumentsType, parseArgs } from "@server/socket-server/arg-parser";
import { ITEMS } from "@server/game-logic/items";
import { filterItems, joinRoom, sendLPMessage, sendStamps } from "@server/socket-server/handlers/join";
import { getStamp } from "@server/socket-server/handlers/puffle";
import { RoomName, ROOMS } from "@server/game-data/rooms";
import PuffleLaunchGameSet from "@server/game-logic/pufflelaunch";
import { CARDS } from "@server/game-logic/cards";
import { CPUpdate } from "@server/updates";
import { UPDATES } from "@server/updates/updates";
import { isVersionValid, processVersion } from "@server/routes/versions";
import { PenguinContext, RoomContext } from "@server/socket-server/handlers/handlers";

type CommandContext = PenguinContext | RoomContext;
type CommandHandler<T extends Array<string | number>> = (ctx: CommandContext, ...args: T) => void;

type CommandResponse = (ctx: CommandContext, args: Array<string>) => void;
type CommandsGenerator = Array<[
  string,
  Array<[ArgumentsIndicator, callback: (ctx: CommandContext, ...args: Array<string | number>) => void]>,
  CommandDisplayInfo
]>;

interface CommandDisplayInfo {
  argNames: Array<string>
  description: string
  examples: Array<string>
}

interface CommandDisplayInfoFull extends CommandDisplayInfo {
  name: string
}

const getCommands = (generators: CommandsGenerator): Array<[string, CommandResponse]> => {
  return generators.map(([name, responses]) => {
    const responder: CommandResponse = (ctx: CommandContext, commandArgs: Array<string>): void => {
      for (const [types, callback] of responses) {
        const parse = parseArgs(commandArgs, types);
        if (parse !== null) {
          callback(ctx, ...parse);
          break;
        }
      }
    }
      
    return [
      name,
      responder
    ]
  });
}

const handleAddItem: CommandHandler<[number]> = ({ msg, penguin, prst }, itemId) => {
  penguin.inventory.add(itemId);
  msg.send(penguin, 'ai', itemId, penguin.currency.coins);
  prst(penguin);
}

const handleAddAllItems: CommandHandler<[string]> = ({ msg, penguin, prst, data }, action) => {
  if (action === 'all') {
    const allItems = ITEMS.rows;
    allItems.forEach(item => penguin.inventory.add(item.id));

    msg.send(penguin, 'gi', ...filterItems(data, penguin.inventory.items));
    prst(penguin);
  }
}

const handleAddStamp: CommandHandler<[number]> = (ctx, stampId) => {
  getStamp(ctx.data, ctx.msg, ctx.penguin, stampId);
  sendStamps(ctx);
  ctx.prst(ctx.penguin);
}

const handleAddAllStamps: CommandHandler<[string]> = (ctx, action) => {
  if (action !== 'all') {
    return;
  }

  ctx.data.getStampbook().forEach(category => {
    category.stamps.forEach(stamp => {
      getStamp(ctx.data, ctx.msg, ctx.penguin, stamp.stamp_id);
    });
  });
  sendStamps(ctx);
  ctx.prst(ctx.penguin);
}

const handleJoinRoomId: CommandHandler<[number]> = (ctx, id) => {
  joinRoom(ctx, id, 0, 0);
}

const handleJoinRoomName: CommandHandler<[string]> = (ctx, name) => {
  if (name in ROOMS) {
    const info = ROOMS[name as RoomName];
    joinRoom(ctx, info.id, 0, 0);
  }
}

const handleAddCoins: CommandHandler<[number]> = ({ msg, penguin, prst, data }, coins) => {
  console.log(typeof coins, 'eis os coins');
  const total = penguin.currency.add(coins);

  if (data.isPreCpip()) {
    msg.send(penguin, 'ac', total);
  } else {
    sendLPMessage(penguin, data, msg);
  }

  prst(penguin);
}

const handleRename: CommandHandler<string[]> = ({ penguin, msg, data, prst }, ...names) => {
  const name = names.join(' ');

  penguin.changeName(name);
  // TODO what about pre-cpip?
  sendLPMessage(penguin, data, msg);
  prst(penguin);
}

const handleAwards: CommandHandler<[]> = ({ msg, penguin, prst }) => {
  // grant m7-m11 awards for speedrunning
  const awards = [815, 817, 819, 822, 8007];
  awards.forEach((award) => {
    penguin.inventory.add(award);
    msg.send(penguin, 'ai', award, penguin.currency.coins);
  });
  prst(penguin);
}

const handleAge: CommandHandler<[]> = ({ msg, prst, penguin, data }) => {  
  penguin.time.setVirtualRegistrationToNow();
  sendLPMessage(penguin, data, msg);
  prst(penguin);
}

const handleMember: CommandHandler<[]> = ({ penguin, prst, msg, data }) => {
  penguin.membership.swap();
  sendLPMessage(penguin, data, msg);
  prst(penguin);
}

const handleAddFurniture: CommandHandler<[number, number]> = ({ penguin, prst, msg }, id: number, amount: number): void => {
  const ownedAmount = penguin.igloo.getFurnitureAmount(id);
  const addAmount = Math.max(Math.min(amount, 99 - ownedAmount), 0);
  penguin.igloo.addFurniture(id, addAmount);
  for (let i = 0; i < addAmount; i++) {
    msg.send(penguin, 'af', id, penguin.currency.coins);
  }

  prst(penguin);
}

const handleAddOneFurniture: CommandHandler<[number]> = (ctx, id) => handleAddFurniture(ctx, id, 1);

function getPuffleLaunchDataWithAlLBerries(times: number[], turboStatuses: boolean[]): PuffleLaunchGameSet {
  return new PuffleLaunchGameSet([
    34, 46, 99, 90, 115, 39,
    84, 42, 120, 123, 183, 54,
    59, 75, 243, 88, 203, 135,
    113, 284, 122, 153, 172, 69,
    44, 48, 103, 97, 86, 144,
    318, 165, 219, 87, 277, 33
  ], times, turboStatuses);
}

const handleUnlockPlLevels: CommandHandler<[]> = ({ penguin, prst }) => {
  penguin.puffleLaunch.set(new PuffleLaunchGameSet((new Array<number>(36)).fill(0x1), [], []).get());
  prst(penguin);
}

const handleUnlockTimeAttack: CommandHandler<[]> = ({ penguin, prst }) => {
  penguin.puffleLaunch.set(getPuffleLaunchDataWithAlLBerries([], []).get());
  prst(penguin);
}

const handleUnlockTurbo: CommandHandler<[]> = ({ penguin, prst }) => {
  penguin.puffleLaunch.set(getPuffleLaunchDataWithAlLBerries((new Array<number>(36)).fill(1), []).get());
  prst(penguin);
}

const handleUnlockSlowMove: CommandHandler<[]> = ({ penguin, prst }) => {
  penguin.puffleLaunch.set(getPuffleLaunchDataWithAlLBerries((new Array<number>(36)).fill(1), (new Array<boolean>(36)).fill(true)).get());
  prst(penguin);
}

const handleNoSave: CommandHandler<[]> = ({ penguin, prst }) => {
  penguin.preference.disableSave();
  prst(penguin, true);
}

const handleEnableSave: CommandHandler<[]> = ({ penguin, prst }) => {
  penguin.preference.enableSave();
  prst(penguin);
}

const handleAmulet: CommandHandler<[string]> = ({ penguin, prst }, element) => {
  switch (element) {
    case 'water':
      penguin.ninja.setWaterNinja(!penguin.ninja.isWaterNinja);
      break;
    case 'snow':
      penguin.ninja.setSnowNinja(!penguin.ninja.isSnowNinja);
      break;
  }
  prst(penguin);
}

const handleCjOneWin: CommandHandler<[]> = ({ penguin, prst }) => {
  penguin.ninja.addMatchProgress(true);
  prst(penguin);
}

const handleCjWins: CommandHandler<[number]> = ({ penguin, prst }, amount) => {
  for (let i = 0; i < amount; i++) {
    penguin.ninja.addMatchProgress(true);
  }
  prst(penguin);
}

const handlePowercards: CommandHandler<[]> = ({ penguin, prst }) => {
  CARDS.rows.forEach(row => {
    if (row.powerId > 0) {
      penguin.ninja.addCard(row.id, 1);
    }
  });
  prst(penguin);
}

const handleAddCard: CommandHandler<[number, number]> = ({ penguin, prst }, card, amount) => {
  penguin.ninja.addCard(card, amount);
  prst(penguin);
}

const handleSafechat: CommandHandler<[]> = ({ penguin, prst }) => {
  penguin.preference.setSafeChat(!penguin.preference.isSafeChat);
  prst(penguin);
}

const normalizeCommandName = (name: string): string => name.toLowerCase().replace(/[^a-z0-9]/g, '');

const findPartyUpdate = (name: string) => {
  const normalized = normalizeCommandName(name);
  if (normalized === '') {
    return undefined;
  }
  const parties = UPDATES.filter(update => 'partyName' in update.update);
  const exact = parties.find(update => {
    const updateName = (update.update as { partyName: string }).partyName;
    return normalizeCommandName(updateName) === normalized;
  });
  if (exact !== undefined) {
    return exact;
  }

  const partial = parties.filter(update => {
    const updateName = (update.update as { partyName: string }).partyName;
    return normalizeCommandName(updateName).includes(normalized);
  });
  return partial[partial.length - 1];
};

export const FEATURE_UPDATES: Record<string, CPUpdate> = {
  migrator: { migrator: true },
  bakery: { bakery: true },
  'coins-for-change': {
    coinsForChange: true,
    cfcValues: [100000000, 250000000, 500000000]
  },
  'battle-of-doom': { battleOp: 'battle-of-doom' },
  'brown-puffle': { freeBrownPuffle: true }
};

const findFeature = (name: string) => {
  const normalized = normalizeCommandName(name);
  return Object.keys(FEATURE_UPDATES).find(feature => normalizeCommandName(feature) === normalized);
};

const startEvent = (ctx: CommandContext, name: string): boolean => {
  const feature = findFeature(name);
  if (feature !== undefined) {
    ctx.data.setEventOverride(`feature:${feature}`, FEATURE_UPDATES[feature]);
    return true;
  }

  const party = findPartyUpdate(name);
  if (party === undefined) {
    return false;
  }

  ctx.data.setEventOverride('party', party.update);
  return true;
};

const stopEvent = (ctx: CommandContext, name: string): void => {
  const normalized = normalizeCommandName(name);
  if (normalized === 'all' || normalized === 'everything') {
    ctx.data.clearEventOverrides();
    return;
  }

  const feature = findFeature(name);
  if (feature !== undefined) {
    ctx.data.clearEventOverride(`feature:${feature}`);
  } else {
    ctx.data.clearEventOverride('party');
  }
};

const handleMainVersion: CommandHandler<[string]> = (ctx, version) => {
  if (!isVersionValid(version)) {
    return;
  }
  try {
    processVersion(version);
  } catch {
    return;
  }

  ctx.data.clearEventOverrides();
  ctx.settings.updateSettings({
    version,
    main_version: version,
    game_mode: 'main',
    timeline_progression: false
  });
  void ctx.resetWorld();
};

const handleParty: CommandHandler<string[]> = (ctx, ...name) => {
  const normalized = normalizeCommandName(name.join(' '));
  if (normalized === 'off' || normalized === 'stop' || normalized === 'end') {
    stopEvent(ctx, 'party');
    void ctx.resetWorld();
    return;
  }

  if (startEvent(ctx, name.join(' '))) {
    void ctx.resetWorld();
  }
};

const handleEndParty: CommandHandler<[]> = (ctx) => {
  stopEvent(ctx, 'party');
  void ctx.resetWorld();
};

const handleEvent: CommandHandler<string[]> = (ctx, ...args) => {
  const [action = 'start', ...rest] = args;
  const name = rest.join(' ');
  const normalized = normalizeCommandName(action);

  if (normalized === 'stop' || normalized === 'end' || normalized === 'clear' || normalized === 'off') {
    stopEvent(ctx, name === '' ? 'all' : name);
    void ctx.resetWorld();
    return;
  }

  const eventName = normalized === 'start' || normalized === 'on' ? name : args.join(' ');
  if (startEvent(ctx, eventName)) {
    void ctx.resetWorld();
  }
};

const handleSpawnMascot: CommandHandler<string[]> = (ctx, ...name) => {
  const roomId = 'room' in ctx && ctx.room !== undefined ? ctx.room.id : 100;
  ctx.npcs.spawnMascot(name.join(' '), roomId);
};

const handleDespawnMascot: CommandHandler<string[]> = (ctx, ...name) => {
  ctx.npcs.despawnMascot(name.join(' '));
};

const handleMascotSay: CommandHandler<string[]> = (ctx, ...args) => {
  const [name = '', ...message] = args;
  ctx.npcs.sayMascot(name, message.join(' '));
};

export class CommandsHandler {
  private _listeners: Map<
    string,
    CommandResponse
  >;

  constructor(listeners: Array<[string, CommandResponse]>) {
    this._listeners = new Map(listeners);
  }

  public run(ctx: CommandContext, name: string, args: Array<string>) {
    const callback = this._listeners.get(name);
    if (callback !== undefined) {
      callback(ctx, args);
    }
  }
}

const c = <const T extends ArgumentsIndicator>(args: T, callback: (ctx: CommandContext, ...args: GetArgumentsType<T>) => void): [ArgumentsIndicator, callback: (ctx: CommandContext, ...args: Array<string | number>) => void] => {
  return [args, callback as (ctx: CommandContext, ...args: Array<string | number>) => void];
}

const generators: CommandsGenerator = [
  [
    'ai',
    [c(['number'], handleAddItem), c(['string'], handleAddAllItems)],
    {
      argNames: ['id'],
      description: "Add a clothing item to your penguin. You can also do 'ai all' to add all clothing items in the game.",
      examples: ['ai 102', 'ai all']
    }
  ],
  [
    'stamp',
    [c(['number'], handleAddStamp), c(['string'], handleAddAllStamps)],
    {
      argNames: ['id'],
      description: "Add a stamp to your stampbook. You can also do 'stamp all' to add every stamp available in the current timeline.",
      examples: ['stamp 6', 'stamp all']
    }
  ],
  [
    'jr',
    [c(['number'], handleJoinRoomId), c(['string'], handleJoinRoomName)],
    {
      argNames: ['id/name'],
      description: "Join a room by its ID or name.",
      examples: ['jr 400', 'jr plaza']
    }
  ],
  [
    'ac',
    [c(['number'], handleAddCoins)],
    {
      argNames: ['amount'],
      description: "Add a given amount of coins to your penguin. You can also give a negative number to subtract coins.",
      examples: ['ac 1024', 'ac -329']
    }
  ],
  [
    'rename',
    [c('string', handleRename)],
    {
      argNames: ['name'],
      description: "Rename your penguin to something else.",
      examples: ['rename UnfunnyPenguin67']
    }
  ],
  [
    'awards',
    [c([], handleAwards)],
    {
      argNames: [],
      description: "For speedrunning purposes, adds the medals from PSA missions 7 through 11 to your penguin.",
      examples: []
    }
  ],
  [
    'age',
    [c([], handleAge)],
    {
      argNames: [],
      description: `Make your penguin's \"birthday\" be on the day you are currently in on the timeline.

      For example, if you run this command on January 15, 2009, and then jump to February 20, 2009, then your penguin will be 36 days old.
      `,
      examples: []
    }
  ],
  [
    'member',
    [c([], handleMember)],
    {
      argNames: [],
      description: "Swap the membership status of your penguin. If your penguin is currently a member, then it will turn into a non-member, and vice-versa.",
      examples: []
    }
  ],
  [
    'af',
    [c(['number', 'number'], handleAddFurniture), c(['number'], handleAddOneFurniture)],
    {
      argNames: ['id', 'quantity'],
      description: "Adds the given quantity (or just 1 if not provided) of the furniture item with the given ID to your penguin.",
      examples: ['af 33', 'af 2320 50']
    }
  ],
  [
    'plunlocklevels',
    [c([], handleUnlockPlLevels)],
    {
      argNames: [],
      description: "Unlocks all levels in Puffle Launch.",
      examples: []
    }
  ],
  [
    'plunlocktimeattack',
    [c([], handleUnlockTimeAttack)],
    {
      argNames: [],
      description: "Unlocks time attack mode in Puffle Launch.",
      examples: []
    }
  ],
  [
    'plunlockturbo',
    [c([], handleUnlockTurbo)],
    {
      argNames: [],
      description: "Unlocks turbo mode in Puffle Launch.",
      examples: []
    }
  ],
  [
    'plunlockslowmode',
    [c([], handleUnlockSlowMove)],
    {
      argNames: [],
      description: "Unlocks slow mode in Puffle Launch.",
      examples: []
    }
  ],
  [
    'nosave',
    [c([], handleNoSave)],
    {
      argNames: [],
      description: "When used, the penguin's current state will be saved, and any changes made to the penguin afterward will not be saved, meaning relogging will go back to the initial state.",
      examples: []
    }
  ],
  [
    'enablesave',
    [c([], handleEnableSave)],
    {
      argNames: [],
      description: "Undoes the effect of the nosave command.",
      examples: []
    }
  ],
  [
    'amulet',
    [c(['string'], handleAmulet)],
    {
      argNames: ['element'],
      description: "Add the gem of the given element to your Card-Jitsu amulet, which can be fire, water, or snow.",
      examples: ['element fire', 'element water', 'element snow']
    }
  ],
  [
    'cjwin',
    [c([], handleCjOneWin), c(['number'], handleCjWins)],
    {
      argNames: ['wins'],
      description: "Adds a given number of wins (or just 1 if not provided) to your Card-Jitsu progress.",
      examples: ['cjwin', 'cjwin 20']
    }
  ],
  [
    'powercards',
    [c([], handlePowercards)],
    {
      argNames: [],
      description: "Adds 1 of each of all the Card-Jitsu powercards to your penguin.",
      examples: []
    }
  ],
  [
    'addcard',
    [c(['number', 'number'], handleAddCard)],
    {
      argNames: ['id', 'amount'],
      description: "Adds the given amount (or just 1 if not provided) of Card-Jitsu cards with the given card ID.",
      examples: ['addcard 76', 'addcard 345 10']
    }
  ],
  [
    'safechat',
    [c([], handleSafechat)],
    {
      argNames: [],
      description: "Toggles safe-chat mode for your penguin.",
      examples: []
    }
  ],
  [
    'mainversion',
    [c(['string'], handleMainVersion)],
    {
      argNames: ['date'],
      description: "Sets the date used by Main Mode and switches the game to that version.",
      examples: ['mainversion 2014-07-17', 'mainversion 2016-11-02']
    }
  ],
  [
    'party',
    [c('string', handleParty)],
    {
      argNames: ['party name'],
      description: "Applies a historical party or named event over the current version until it is stopped.",
      examples: ['party Music Jam 2014', 'party Frozen Party', 'party Holiday Party 2016']
    }
  ],
  [
    'endparty',
    [c([], handleEndParty)],
    {
      argNames: [],
      description: "Removes the forced party/event room override from the current version.",
      examples: []
    }
  ],
  [
    'event',
    [c('string', handleEvent)],
    {
      argNames: ['start/stop', 'name'],
      description: "Starts or stops forced timed features. Built-in features are migrator, bakery, coins-for-change, battle-of-doom, and brown-puffle.",
      examples: ['event start bakery', 'event start Music Jam 2016', 'event stop all']
    }
  ],
  [
    'spawnmascot',
    [c('string', handleSpawnMascot)],
    {
      argNames: ['name'],
      description: "Spawns a Club Penguin mascot in your current room.",
      examples: ['spawnmascot Rockhopper', 'spawnmascot Aunt Arctic', 'spawnmascot Gary']
    }
  ],
  [
    'despawnmascot',
    [c('string', handleDespawnMascot)],
    {
      argNames: ['name'],
      description: "Removes a spawned mascot from the island.",
      examples: ['despawnmascot Rockhopper']
    }
  ],
  [
    'mascotsay',
    [c('string', handleMascotSay)],
    {
      argNames: ['name', 'message'],
      description: "Makes a spawned mascot say a message. For multi-word mascot names, remove the spaces.",
      examples: ['mascotsay Rockhopper ahoy', 'mascotsay AuntArctic hello reporters']
    }
  ]
];

export function getCommandsList(): Array<CommandDisplayInfoFull> {
  return generators.map(([name, _, displayInfo]) => {
    return { name, ...displayInfo }
  });
}

export const getCommandsHandler = (): CommandsHandler => {
  return new CommandsHandler(getCommands(generators));
}