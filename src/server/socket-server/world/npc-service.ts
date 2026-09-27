import { choose, randomInt } from "@common/utils";
import { getDefaultPenguin, PenguinJson } from "@server/database/database";
import { TIME_HUB_ROOM_ID } from "@server/game-data/rooms";
import { SettingsManager } from "@server/settings";
import { GameData } from "@server/timelines/game-data";
import { STORY_QUESTS, TIMELINE_ACHIEVEMENTS, getQuestsForEra, isQuestComplete } from "@server/game-data/story-progress";
import { UPDATES } from "@server/updates/updates";
import { isGreater, isLower } from "@server/routes/versions";
import { getPenguinString, sendLPMessage } from "../handlers/join";
import { PenguinMessenger } from "../messenger";
import { World } from "./world";
import { WorldPenguin } from "./world-penguin";
import { WorldRoom } from "./world-room";
import { PenguinPersister } from "../handlers/handlers";

type NpcSpec = {
  id: number;
  name: string;
  color: number;
  homeRoom: number;
  phrases: string[];
  outfit?: Partial<Pick<PenguinJson, 'head' | 'face' | 'neck' | 'body' | 'hand' | 'feet' | 'pin' | 'background'>>;
  stationary?: boolean;
};

type ActiveNpc = {
  spec: NpcSpec;
  penguin: WorldPenguin;
  nextAction: number;
  nextReply: number;
  followPlayerId?: number;
  followUntil?: number;
};

export const NPC_ID_START = 900001;

const NPC_HEADS = [0, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431];
const NPC_FACES = [0, 101, 103, 106, 108, 110, 111, 112, 113, 114, 116, 117, 118, 119, 120, 125, 126, 131, 136];
const NPC_NECKS = [0, 161, 214, 216, 300, 301, 302, 303, 304, 305];
const NPC_BODIES = [0, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 215, 217, 218, 219, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230];
const NPC_HANDS = [0, 220, 233, 234, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337];
const NPC_FEET = [0, 351, 352, 353, 354, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371];

const pickNpcItem = (items: number[], npcId: number, slot: number) => {
  return items[Math.abs((npcId * 31 + slot * 17 + npcId * npcId) % items.length)];
};

const getNpcOutfit = (npcId: number): NpcSpec['outfit'] => ({
  head: pickNpcItem(NPC_HEADS, npcId, 0),
  face: pickNpcItem(NPC_FACES, npcId, 1),
  neck: pickNpcItem(NPC_NECKS, npcId, 2),
  body: pickNpcItem(NPC_BODIES, npcId, 3),
  hand: pickNpcItem(NPC_HANDS, npcId, 4),
  feet: pickNpcItem(NPC_FEET, npcId, 5)
});

export type TimelineHubHooks = {
  getNextEra(): string | undefined;
  advanceToNextEra(penguin: WorldPenguin): Promise<string>;
  travelToHub(penguin: WorldPenguin): void;
  requestTravelToHub(penguinId: number): void;
  openTimeline(penguinId: number): void;
  openJournal(penguinId: number): void;
};

const NPCS: NpcSpec[] = [
  {
    id: 900001,
    name: 'Icy Pete',
    color: 1,
    homeRoom: 100,
    phrases: [
      'anyone seen a puffle around here?',
      'the snow feels extra snowy today',
      'i am practicing my best waddle',
      'does anyone want to play a game?',
      'the dock is a great place to watch the waves',
      'i heard there might be a pin hidden somewhere',
      'this town has the best view of the island'
    ]
  },
  {
    id: 900002,
    name: 'Snowball Sue',
    color: 9,
    homeRoom: 100,
    phrases: [
      'i keep missing the snowball target',
      'the coffee shop smells amazing',
      'has anyone been to the lighthouse?',
      'i found a new favorite spot on the island',
      'snowball fights are better with friends',
      'i am trying to visit every room today',
      'the plaza always has something happening'
    ]
  },
  {
    id: 900003,
    name: 'Waddle Dee',
    color: 7,
    homeRoom: 330,
    phrases: [
      'pizza is the best island food',
      'i could really go for some pizza',
      'watch out for the pizza oven',
      'who wants a slice?',
      'the pizza parlor is my second home',
      'i heard the dessert pizza is legendary',
      'does anyone know the secret recipe?'
    ]
  },
  {
    id: 900004,
    name: 'Puffle Pal',
    color: 13,
    homeRoom: 110,
    phrases: [
      'my favorite puffles are the blue ones',
      'the pet shop is always busy',
      'i am saving coins for puffle food',
      'puffles make the best explorers',
      'i think my puffle learned a new trick',
      'has anyone tried puffle roundup?',
      'the coffee shop chairs are perfect for relaxing'
    ]
  },
  {
    id: 900005,
    name: 'Captain Cocoa',
    color: 6,
    homeRoom: 110,
    phrases: [
      'one more cup of cocoa and i am ready for adventure',
      'the coffee shop is the coziest room on the island',
      'i like watching everyone waddle through here',
      'anyone want to share island stories?',
      'the bean counters are always busy'
    ]
  },
  {
    id: 900006,
    name: 'DJ Splash',
    color: 14,
    homeRoom: 120,
    phrases: [
      'the dance floor is calling my name',
      'this song always gets everyone moving',
      'i am trying to learn a new dance move',
      'the nightclub feels alive today',
      'who is ready to dance?'
    ]
  },
  {
    id: 900007,
    name: 'Agent Tux',
    color: 2,
    homeRoom: 210,
    phrases: [
      'i am keeping an eye on island visitors',
      'the ski lodge has a mysterious vibe',
      'i think the mountains hide a secret',
      'stay alert, penguins',
      'this outfit helps me blend in perfectly'
    ]
  },
  {
    id: 900008,
    name: 'Dojo Dan',
    color: 15,
    homeRoom: 320,
    phrases: [
      'the dojo is peaceful today',
      'card-jitsu takes patience and practice',
      'i am training my ninja skills',
      'the mountains teach us focus',
      'a calm mind wins the round'
    ]
  },
  {
    id: 900009,
    name: 'Timeline Keeper',
    color: 16,
    homeRoom: TIME_HUB_ROOM_ID,
    stationary: true,
    phrases: [
      'the timeline is stable for now',
      'earn enough coins and we can visit the next era',
      'this command center protects the island timeline',
      'every era has its own rooms, catalogs, and secrets',
      'say time travel when you are ready to advance'
    ]
  },
  {
    id: 900010,
    name: 'Guide Gary',
    color: 4,
    homeRoom: 100,
    stationary: true,
    phrases: [
      'looking for the time command center? walk up to me',
      'i found a strange portal near here',
      'the future is closer than you think',
      'stand next to me and i can show you the command center'
    ],
    outfit: {
      face: 115,
      body: 219,
      feet: 358
    }
  },
  {
    id: 900011,
    name: 'Marina',
    color: 3,
    homeRoom: 400,
    phrases: [
      'the beach is perfect for exploring',
      'i love watching the waves',
      'the cove is just past the surf',
      'bring your swim gear today'
    ]
  },
  {
    id: 900012,
    name: 'Harbor Hank',
    color: 8,
    homeRoom: 800,
    phrases: [
      'the dock gets busy fast',
      'watch the boats roll in',
      'i spotted something shiny near the water',
      'wave to everyone waddling by'
    ]
  },
  {
    id: 900013,
    name: 'Berg Scout',
    color: 11,
    homeRoom: 805,
    phrases: [
      'the iceberg looks calm today',
      'keep your flippers dry',
      'icebergs have stories to tell',
      'the horizon is beautiful here'
    ]
  },
  {
    id: 900014,
    name: 'Lodge Luna',
    color: 10,
    homeRoom: 220,
    phrases: [
      'the lodge is cozy tonight',
      'ski trips end with hot cocoa',
      'the mountains always impress me',
      'the fireplace is the best seat in the room'
    ]
  },
  {
    id: 900015,
    name: 'Pet Curator',
    color: 5,
    homeRoom: 310,
    phrases: [
      'every puffle deserves a good home',
      'the pet shop needs a careful eye',
      'puffles are always learning something new',
      'adoption day is my favorite day'
    ]
  },
  {
    id: 900016,
    name: 'Plaza Pearl',
    color: 12,
    homeRoom: 300,
    phrases: [
      'the plaza feels alive today',
      'everyone passes through here eventually',
      'i love watching the town bustle',
      'this spot is perfect for people watching'
    ]
  },
  {
    id: 900017,
    name: 'Snow Drifter',
    color: 6,
    homeRoom: 230,
    phrases: [
      'the slopes are fast today',
      'watch your edges on that hill',
      'sled racing never gets old',
      'the summit air is crisp'
    ]
  },
  {
    id: 900018,
    name: 'Shop Spruce',
    color: 17,
    homeRoom: 130,
    phrases: [
      'the gift shop has some neat finds',
      'new stock just arrived',
      'style is all about timing',
      'there are bargains everywhere'
    ]
  },
  {
    id: 900019,
    name: 'Book Wren',
    color: 15,
    homeRoom: 111,
    phrases: [
      'the book room smells like adventure',
      'i am always halfway through a novel',
      'quiet rooms are underrated',
      'some pages are worth rereading'
    ]
  },
  {
    id: 900020,
    name: 'Mine Mika',
    color: 4,
    homeRoom: 808,
    phrases: [
      'the mine echoes nicely',
      'watch for carts on the track',
      'there is treasure down here if you look',
      'i keep finding old coins in the dirt'
    ]
  },
  {
    id: 900021,
    name: 'Lake Lumen',
    color: 13,
    homeRoom: 814,
    phrases: [
      'the hidden lake is a great escape',
      'i like the quiet water here',
      'the mountains look so close',
      'i come here to think'
    ]
  },
  {
    id: 900022,
    name: 'Forge Finn',
    color: 18,
    homeRoom: 806,
    phrases: [
      'the boiler room hums along',
      'someone has to keep the island warm',
      'i like the steam and the noise',
      'the furnace is running hot today'
    ]
  }
];

const GENERATED_FIRST_NAMES = [
  'Arctic', 'Blizzard', 'Bubbles', 'Captain', 'Cocoa', 'Comet', 'Coral', 'Crystal', 'Dash', 'Dozer',
  'Echo', 'Flurry', 'Frost', 'Gale', 'Glacier', 'Harbor', 'Icicle', 'Jazz', 'Juniper', 'Lagoon',
  'Marble', 'Mellow', 'Misty', 'Nimbus', 'Orbit', 'Paddle', 'Pepper', 'Piper', 'Polar', 'Quest',
  'Radar', 'Ripple', 'Rocket', 'Sable', 'Sailor', 'Shadow', 'Skipper', 'Snow', 'Sprinkle', 'Storm',
  'Sunny', 'Tango', 'Tempo', 'Tidal', 'Trail', 'Tundra', 'Velvet', 'Waffle', 'Whisper', 'Zephyr'
];

const GENERATED_LAST_NAMES = [
  'Anchor', 'Bean', 'Breeze', 'Bubble', 'Chill', 'Cloud', 'Cove', 'Drift', 'Fin', 'Flake',
  'Flipper', 'Frost', 'Gear', 'Glide', 'Glow', 'Harbor', 'Ice', 'Jet', 'Lagoon', 'Lantern',
  'Leaf', 'Loop', 'Marsh', 'Mist', 'Moon', 'Peak', 'Pebble', 'Pine', 'Quill', 'Reef',
  'Sail', 'Shade', 'Shell', 'Shiver', 'Signal', 'Snow', 'Sprout', 'Star', 'Surf', 'Tide',
  'Trail', 'Tumble', 'Wave', 'Whisker', 'Wind', 'Wing', 'Winter', 'Wonder', 'Zest', 'Zigzag'
];

const GENERATED_ROOMS = [
  100, 110, 111, 120, 121, 130, 200, 210, 220, 221, 230, 300, 310, 320, 330, 400, 800, 801, 802, 804, 805, 806, 807, 808, 810
];

const GENERATED_THEMES = [
  ['i am mapping every corner of the island', 'this room always has something happening', 'have you explored the whole island yet?'],
  ['i am looking for a good game', 'table games are my favorite challenge', 'i am practicing my victory dance'],
  ['i love watching puffles play', 'the pet shop is full of energy', 'my puffle keeps me busy'],
  ['i am searching for hidden pins', 'every era hides different surprises', 'keep your eyes open for badges'],
  ['the snow makes the island feel alive', 'i am enjoying the cold breeze', 'the slopes are calling my name'],
  ['i heard there are secret codes', 'a good code can be worth a fortune', 'someone whispered WADDLEFOREVER to me'],
  ['i am planning my next outfit', 'style changes with every era', 'the gift shop has great finds'],
  ['i am studying card-jitsu strategy', 'fire beats snow and snow beats water', 'the dojo teaches patience'],
  ['i like meeting new penguins', 'hello to anyone passing through', 'this island is full of friendly faces'],
  ['i am saving coins for a big upgrade', 'the timeline keeper knows things', 'time travel is serious business']
];

GENERATED_FIRST_NAMES.forEach((firstName, firstIndex) => {
  [0, 1].forEach((series) => {
    const index = firstIndex + series * GENERATED_FIRST_NAMES.length;
    const id = 900023 + index;
    const phrases = GENERATED_THEMES[index % GENERATED_THEMES.length];
    NPCS.push({
      id,
      name: `${firstName} ${GENERATED_LAST_NAMES[(index + series * 25) % GENERATED_LAST_NAMES.length]}`,
      color: (id % 18) + 1,
      homeRoom: GENERATED_ROOMS[index % GENERATED_ROOMS.length],
      phrases: [
        ...phrases,
        `my name is ${firstName.toLowerCase()} if you need me`,
        index % 3 === 0 ? 'i keep hearing rumors about the time command center' : 'the island feels different every day'
      ]
    });
  });
});

const SECRET_CODES: Record<string, { coins: number; hint: string }> = {
  WADDLEFOREVER: { coins: 2500, hint: 'a welcome gift from the island locals' },
  TIMEHUB: { coins: 5000, hint: 'time command authorization accepted' },
  PUFFLEPOWER: { coins: 1500, hint: 'the pet shop appreciates your enthusiasm' },
  PIZZAPARTY: { coins: 750, hint: 'a slice-sized reward' },
  CARDJITSU: { coins: 1500, hint: 'the dojo honors your training' },
  AGENTREADY: { coins: 2000, hint: 'special agent funds deposited' },
  HIDDENPIN: { coins: 3000, hint: 'a pin hunter reward' },
  SNOWDAY: { coins: 500, hint: 'a snow day bonus' },
  SLEDCHASE: { coins: 1000, hint: 'ski hill winnings' },
  COINCACHE: { coins: 4000, hint: 'the secret cache is yours' }
};

const CONVERSATIONS: string[][] = [
  [
    'what is your favorite room?',
    'probably the pizza parlor',
    'good choice!'
  ],
  [
    'want to explore the island?',
    'sure, follow me!',
    'this way!'
  ],
  [
    'have you tried cart surfer?',
    'yes, but i always crash',
    'practice makes perfect'
  ],
  [
    'i saw a puffle near the pet shop',
    'was it blue?',
    'of course it was!'
  ],
  [
    'did you find the hidden pin yet?',
    'not yet, i am still looking',
    'maybe check the rooms near the beach'
  ],
  [
    'what game should we play first?',
    'maybe sled racing or find four',
    'i vote for find four'
  ],
  [
    'the island feels busy today',
    'lots of penguins are exploring',
    'that is always fun'
  ],
  [
    'want to meet up at the dojo later?',
    'yes, i will bring my best cards',
    'see you there'
  ],
  [
    'i heard the migrator might visit soon',
    'that would be exciting',
    'keep an eye on the map'
  ],
  [
    'i am saving coins for a new outfit',
    'the gift shop has cool styles',
    'fashion is serious business'
  ],
  [
    'did you see the new catalog?',
    'i did, there were some nice finds',
    'i already want everything'
  ]
];

const COMMON_QUESTION_TOPICS = [
  'the town', 'the plaza', 'the dock', 'the beach', 'the cove', 'the ski village', 'the ski lodge', 'the mountain', 'the mine', 'the mine shack',
  'the boiler room', 'the book room', 'the coffee shop', 'the dance club', 'the arcade', 'the gift shop', 'the pet shop', 'the pizza parlor', 'the iceberg', 'the lighthouse',
  'the dojo', 'card-jitsu', 'mancala', 'find four', 'sled racing', 'ice fishing', 'jet pack adventure', 'catchin waves', 'aqua grabber',
  'puffles', 'coins', 'secret codes', 'hidden pins', 'stamps', 'the stampbook', 'igloos', 'furniture', 'clothing catalogs', 'rare items',
  'the epf', 'the psa', 'the tour guide', 'the newspaper', 'the stage', 'parties', 'the time command center', 'timeline progression', 'mascots', 'new rooms'
];

const COMMON_QUESTION_TEMPLATES = [
  'i think TOPIC is worth exploring',
  'TOPIC is one of my favorite places on the island',
  'you can usually learn more about TOPIC by looking around',
  'i heard something interesting about TOPIC recently',
  'TOPIC is worth checking out if you have time',
  'the best way to learn about TOPIC is to try it yourself',
  'i would start with TOPIC and see where it leads',
  'TOPIC can hide some useful surprises',
  'TOPIC has been on my mind all day',
  'a friendly penguin once told me to pay attention to TOPIC'
];

const COMMON_QUESTION_RESPONSES = COMMON_QUESTION_TOPICS.flatMap(topic =>
  COMMON_QUESTION_TEMPLATES.map(template => template.replace('TOPIC', topic))
);

const TIP_TOPICS = [
  'save your coins before buying timeline upgrades',
  'visit the dojo when you want to practice card-jitsu',
  'check room decorations for hidden pins',
  'try a table game if you want a quick challenge',
  'walk near a penguin if you want it to hear you',
  'say code followed by a secret word to redeem it',
  'keep an eye on the newspaper for island rumors',
  'different eras can unlock different items',
  'the pet shop is a good place to learn about puffles',
  'the mine has always been a great coin source',
  'the lighthouse area is worth exploring',
  'the catalog sometimes hides surprises',
  'talk to the timeline keeper when you are ready to advance',
  'guide gary can help you reach the time command center',
  'earn coins from games before spending them',
  'watch for mascots during parties',
  'the iceberg is a classic place to explore',
  'new rooms can hide secrets',
  'stamps reward exploration and challenges',
  'your outfit tells other penguins a story'
];

const TIP_TEMPLATES = [
  'TOPIC',
  'my best advice is to TOPIC',
  'if you want a tip, TOPIC',
  'try to TOPIC',
  'a smart penguin would TOPIC',
  'remember to TOPIC',
  'you should TOPIC',
  'one useful trick is to TOPIC',
  'here is a tip: TOPIC',
  'when in doubt, TOPIC'
];

const TIP_RESPONSES = TIP_TOPICS.flatMap(topic =>
  TIP_TEMPLATES.map(template => template.replace('TOPIC', topic))
);

const PLAYER_RESPONSES: Array<[RegExp, string[]]> = [
  [/\b(hi|hello|hey|sup|yo)\b/i, [
    'hi there!',
    'hello!',
    'hey, welcome!',
    'nice to see you!'
  ]],
  [/\b(bye|goodbye|later|gtg)\b/i, [
    'bye! see you around!',
    'have fun exploring!',
    'later!'
  ]],
  [/\b(name|called)\b/i, [
    'i am one of the island locals',
    'you can call me by my penguin name',
    'i have lived here a long time'
  ]],
  [/\b(puffle|pet)\b/i, [
    'puffles are the best',
    'i hope your puffle is having a great day',
    'the pet shop is worth a visit'
  ]],
  [/\b(pizza|food|hungry|eat)\b/i, [
    'now i am thinking about pizza',
    'the pizza parlor is close by',
    'save me a slice!'
  ]],
  [/\b(game|play|mini game|minigame)\b/i, [
    'want to try find four?',
    'a minigame sounds fun',
    'i like exploring between games'
  ]],
  [/\b(card.?jitsu|dojo|ninja|cards?)\b/i, [
    'card-jitsu takes practice',
    'the dojo is a peaceful place',
    'choose your card wisely'
  ]],
  [/\b(where|room|go|directions?)\b/i, [
    'the map can take you anywhere on the island',
    'try checking the plaza',
    'i like wandering between the rooms'
  ]],
  [/\b(coin|coins|money)\b/i, [
    'saving coins is smart',
    'minigames are a good way to earn coins',
    'i am saving up too',
    'there are secret codes hidden around town'
  ]],
  [/\b(code|codes|secret code|unlock)\b/i, [
    'try saying code followed by the word',
    'i heard WADDLEFOREVER is a good code to start with',
    'codes can be redeemed once per penguin'
  ]],
  [/\b(pin|pins|badge|badges|stamp|stamps)\b/i, [
    'pins show up in all sorts of places',
    'the room art changes a lot between eras',
    'badges are great for completing collections'
  ]],
  [/\b(mancala|find four|connect four|game)\b/i, [
    'i challenge you to a match',
    'i love quick table games',
    'pick a room and we can play'
  ]],
  [/\b(card.?jitsu|ninja|dojo)\b/i, [
    'card-jitsu takes practice',
    'the dojo is a peaceful place',
    'choose your card wisely'
  ]],
  [/\b(puffle|pet|walk)\b/i, [
    'puffles are the best',
    'i hope your puffle is having a great day',
    'the pet shop is worth a visit'
  ]],
  [/\b(tip|tips|advice|help me)\b/i, TIP_RESPONSES],
  [/\?$/, COMMON_QUESTION_RESPONSES]
];

const GENERIC_RESPONSES = [
  'that sounds fun',
  'interesting!',
  'i like that idea',
  'nice one',
  'i am just enjoying the island today',
  'want to explore together?'
];

const ROOMS = [
  100, // Town
  110, // Coffee Shop
  120, // Dance Club
  130, // Gift Shop
  200, // Ski Village
  210, // Sport Shop
  220, // Ski Lodge
  230, // Ski Hill
  300, // Plaza
  310, // Pet Shop
  330, // Pizza Parlor
  320, // Dojo
  800, // Dock
  400, // Beach
  810 // Cove
];

export class NpcService {
  private _npcs: ActiveNpc[] = [];
  private _timer: NodeJS.Timeout | null = null;
  private _running = false;
  private _hubPromptCooldown = new Map<number, number>();
  private _interactionTargets = new Map<number, number>();

  constructor(
    private _world: World,
    private _msg: PenguinMessenger,
    private _data: GameData,
    private _settings: SettingsManager,
    private _hub: TimelineHubHooks
  ) {}

  public start(): void {
    if (this._running) {
      return;
    }

    this._running = true;
    this._npcs = NPCS.map((baseSpec) => {
      const spec = this.getEraSpec(baseSpec);
      const json = getDefaultPenguin(
        spec.name,
        spec.color,
        this._settings.settings.always_member,
        this._settings.getVirtualDate(0).getTime()
      );
      json.noSave = true;
      const outfit = spec.outfit ?? getNpcOutfit(spec.id);
      Object.assign(json, outfit);
      json.inventory = [...json.inventory, ...Object.values(outfit ?? {}).filter((item): item is number => item !== 0)];

      const penguin = new WorldPenguin(spec.id, json, this._settings);
      this._world.addPenguin(penguin);
      this.placeInRoom(penguin, spec.homeRoom, randomPosition(), randomPosition());

      return {
        spec,
        penguin,
        nextAction: Date.now() + randomInt(5000, 12000),
        nextReply: 0
      };
    });

    this._timer = setInterval(() => {
      void this.tick().catch(console.error);
    }, 1000);
  }

  public stop(): void {
    this._running = false;
    if (this._timer !== null) {
      clearInterval(this._timer);
      this._timer = null;
    }
    this._npcs = [];
  }

  public handlePlayerEnteredRoom(player: WorldPenguin, room: WorldRoom, prst: PenguinPersister): void {
    if (this.isNpc(player.id)) {
      return;
    }

    this.handleStoryRoomVisit(player, room, prst);

    if (room.id !== TIME_HUB_ROOM_ID) {
      return;
    }

    const keeper = this._npcs.find(npc => npc.spec.id === 900009);
    const nextEra = this._hub.getNextEra();
    const line = nextEra === undefined
      ? 'all recorded eras are already unlocked'
      : `welcome to the time command center. the next era is ${nextEra} and costs 5000 coins. walk up to me to open the timeline`;

    delay(1200).then(() => {
      if (this._running && keeper !== undefined && room.players.includes(keeper.penguin)) {
        return this._msg.send(room.players, 'sm', keeper.penguin.id, line).catch(console.error);
      }
    });
  }

  public handlePlayerMoved(player: WorldPenguin, room: WorldRoom, x: number, y: number): void {
    const promptedAt = this._hubPromptCooldown.get(player.id) ?? 0;
    if (promptedAt > Date.now()) {
      return;
    }

    const checkNpc = (npcId: number) => {
      const npc = this._npcs.find(candidate => candidate.spec.id === npcId);
      if (npc === undefined || !room.players.includes(npc.penguin)) {
        return false;
      }
      const state = room.getState(npc.penguin);
      return Math.hypot(state.x - x, state.y - y) < 90;
    };

    if (checkNpc(900010)) {
      this._hubPromptCooldown.set(player.id, Date.now() + 30000);
      this._hub.requestTravelToHub(player.id);
    } else if (room.id === TIME_HUB_ROOM_ID && checkNpc(900009)) {
      this._hubPromptCooldown.set(player.id, Date.now() + 30000);
      this._hub.openTimeline(player.id);
    }
  }

  public handleNpcClick(player: WorldPenguin, npcId: number): boolean {
    const npc = this._npcs.find((candidate) => candidate.penguin.id === npcId);
    if (npc === undefined) {
      return false;
    }

    const room = this._world.getPenguinRoom(npc.penguin);
    if (room !== undefined) {
      this._msg.send(player, 'gp', getPenguinString(this._data, npc.penguin, room.getState(npc.penguin)), room.id).catch(console.error);
    }

    if (npc.spec.id === 900010) {
      this._hub.requestTravelToHub(player.id);
      return true;
    }

    if (npc.spec.id === 900009) {
      this._hub.openTimeline(player.id);
      return true;
    }

    this._interactionTargets.set(player.id, npc.penguin.id);
    this._msg.send(player, 'sm', npc.penguin.id, `say talk, follow, tip, quest, or journal to interact with ${npc.spec.name}`).catch(console.error);
    return true;
  }

  public handleBuddyRequested(player: WorldPenguin, requesterId: number): boolean {
    const npc = this._npcs.find((candidate) => candidate.penguin.id === requesterId);
    if (npc === undefined) {
      return false;
    }

    if (npc.spec.id === 900010) {
      this._hub.requestTravelToHub(player.id);
    }

    return true;
  }

  public handleBuddyAccepted(player: WorldPenguin, requesterId: number): boolean {
    const npc = this._npcs.find((candidate) => candidate.penguin.id === requesterId);
    if (npc === undefined) {
      return false;
    }

    if (npc.spec.id === 900010) {
      this._hub.travelToHub(player);
    }

    return true;
  }

  private getClosestNpc(player: WorldPenguin, room: WorldRoom): ActiveNpc | undefined {
    const playerState = room.getState(player);
    const listeners = this._npcs.filter(npc => room.players.includes(npc.penguin));
    let closest: ActiveNpc | undefined;
    let closestDistance = Number.POSITIVE_INFINITY;

    listeners.forEach(npc => {
      const npcState = room.getState(npc.penguin);
      const distance = Math.hypot(npcState.x - playerState.x, npcState.y - playerState.y);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = npc;
      }
    });

    return closest;
  }

  private getInteractionNpc(player: WorldPenguin, room: WorldRoom): ActiveNpc | undefined {
    const targetId = this._interactionTargets.get(player.id);
    const targeted = this._npcs.find(npc => npc.penguin.id === targetId && room.players.includes(npc.penguin));
    if (targeted !== undefined) {
      return targeted;
    }

    const closest = this.getClosestNpc(player, room);
    if (closest === undefined) {
      return undefined;
    }

    const playerState = room.getState(player);
    const npcState = room.getState(closest.penguin);
    return Math.hypot(npcState.x - playerState.x, npcState.y - playerState.y) < 160 ? closest : undefined;
  }

  private handleNpcInteraction(action: string, npc: ActiveNpc, player: WorldPenguin, room: WorldRoom, prst: PenguinPersister): void {
    let shouldPersist = false;

    if (player.unlockAchievement('social-penguin')) {
      shouldPersist = true;
    }

    switch (action) {
      case 'talk': {
        const phrase = choose(npc.spec.phrases);
        this._msg.send(room.players, 'sm', npc.penguin.id, `${player.name}, ${phrase}`).catch(console.error);
        break;
      }
      case 'tip': {
        const tip = choose(TIP_RESPONSES);
        this._msg.send(room.players, 'sm', npc.penguin.id, tip).catch(console.error);
        break;
      }
      case 'follow': {
        npc.followPlayerId = player.id;
        npc.followUntil = Date.now() + 60000;
        this._msg.send(room.players, 'sm', npc.penguin.id, 'sure, i will follow you for a little while').catch(console.error);
        break;
      }
      case 'quest':
      case 'story': {
        if (player.unlockAchievement('quest-checker')) {
          shouldPersist = true;
        }
        this._msg.send(room.players, 'sm', npc.penguin.id, this.getQuestStatus(player)).catch(console.error);
        break;
      }
      case 'journal': {
        this._hub.openJournal(player.id);
        break;
      }
    }

    if (shouldPersist) {
      prst(player);
    }
  }

  private getQuestStatus(player: WorldPenguin): string {
    if (!this._settings.settings.timeline_progression || this._settings.settings.game_mode !== 'timeline') {
      return 'story mode quests are only active in story mode';
    }

    const quests = getQuestsForEra(this._settings.settings.version);
    const current = quests.find(quest => !player.hasCompletedQuest(quest.id));
    if (current === undefined) {
      return 'all story quests available in this era are complete. try the next era for more adventures';
    }

    const missing = current.rooms.filter(roomId => !player.hasVisitedRoom(roomId));
    return `${current.title}: ${current.description} ${missing.length} step${missing.length === 1 ? '' : 's'} left`;
  }

  private handleStoryRoomVisit(player: WorldPenguin, room: WorldRoom, prst: PenguinPersister): void {
    if (!this._settings.settings.timeline_progression || this._settings.settings.game_mode !== 'timeline') {
      return;
    }

    let changed = player.visitRoom(room.id);
    const unlocked = player.visitedRooms.length;
    if (unlocked >= 5 && player.unlockAchievement('island-explorer')) {
      this.sendAchievement(room, 'Island Explorer');
      changed = true;
    }

    const quests = getQuestsForEra(this._settings.settings.version);
    quests.forEach(quest => {
      if (player.hasCompletedQuest(quest.id) || !isQuestComplete(quest, player.visitedRooms)) {
        return;
      }

      player.completeQuest(quest.id);
      const total = player.currency.add(quest.reward);
      if (player.unlockAchievement('first-quest')) {
        this.sendAchievement(room, 'Story Starter');
      }
      sendLPMessage(player, this._data, this._msg);
      this._msg.send(room.players, 'sm', this.getClosestNpc(player, room)?.penguin.id ?? player.id, `quest complete: ${quest.title}. +${quest.reward} coins (${total} total)`).catch(console.error);
      changed = true;
    });

    if (player.currency.coins >= 5000 && player.unlockAchievement('coin-collector')) {
      this.sendAchievement(room, 'Coin Collector');
      changed = true;
    }

    if (changed) {
      prst(player);
    }
  }

  private sendAchievement(room: WorldRoom, title: string): void {
    const npc = room.players.find(penguin => this.isNpc(penguin.id));
    if (npc !== undefined) {
      this._msg.send(room.players, 'sm', npc.id, `achievement unlocked: ${title}`).catch(console.error);
    }
  }

  private getActivePartyName(): string | undefined {
    const date = this._settings.settings.version;
    const active = UPDATES.filter(update => {
      const isPartyUpdate = 'partyName' in update.update || 'partyStart' in update.update;
      return isPartyUpdate && !isGreater(update.date, date) && (update.end === undefined || isLower(date, update.end));
    });
    const update = active[active.length - 1];
    if (update === undefined) {
      return undefined;
    }
    return 'partyName' in update.update ? update.update.partyName : 'island celebration';
  }

  private getEraSpec(spec: NpcSpec): NpcSpec {
    const partyName = this.getActivePartyName();
    if (partyName === undefined) {
      return spec;
    }

    const partyRoom = spec.id % 10 === 0 && !spec.stationary ? 100 : spec.homeRoom;
    const partyPhrases = [
      `the ${partyName} is the best party ever`,
      `are you enjoying the ${partyName}?`,
      `i decorated my outfit for the ${partyName}`,
      ...spec.phrases
    ];

    return {
      ...spec,
      homeRoom: partyRoom,
      phrases: partyPhrases,
      outfit: {
        head: pickNpcItem(NPC_HEADS, spec.id * 7, 0),
        neck: pickNpcItem(NPC_NECKS, spec.id * 7, 1),
        hand: pickNpcItem(NPC_HANDS, spec.id * 7, 2),
        body: pickNpcItem(NPC_BODIES, spec.id * 7, 3)
      }
    };
  }

  public handlePlayerMessage(player: WorldPenguin, message: string, room: WorldRoom, prst: PenguinPersister): void {
    if (this.isNpc(player.id)) {
      return;
    }

    const normalized = message.toLowerCase();
    const codeMatch = message.match(/^code\s+([a-z0-9_-]+)$/i);
    if (codeMatch !== null) {
      const code = codeMatch[1].toUpperCase();
      const reward = SECRET_CODES[code];
      const speaker = this.getClosestNpc(player, room) ?? choose(this._npcs.filter(npc => room.players.includes(npc.penguin)));
      if (speaker !== undefined) {
        if (reward === undefined) {
          this._msg.send(room.players, 'sm', speaker.penguin.id, 'that secret code is not recognized').catch(console.error);
        } else if (player.hasRedeemedCode(code)) {
          this._msg.send(room.players, 'sm', speaker.penguin.id, 'you already redeemed that code').catch(console.error);
        } else {
          player.redeemCode(code);
          player.unlockAchievement('code-breaker');
          const total = player.currency.add(reward.coins);
          prst(player);
          sendLPMessage(player, this._data, this._msg);
          this._msg.send(room.players, 'sm', speaker.penguin.id, `${reward.hint}. +${reward.coins} coins (${total} total)`).catch(console.error);
        }
      }
      return;
    }

    const actionMatch = normalized.match(/\b(talk|follow|tip|quest|story|journal)\b/);
    if (actionMatch !== null) {
      const npc = this.getInteractionNpc(player, room);
      if (npc !== undefined) {
        this.handleNpcInteraction(actionMatch[1], npc, player, room, prst);
      }
      return;
    }

    const guide = this._npcs.find(npc => npc.spec.id === 900010);
    if (room.id !== TIME_HUB_ROOM_ID && guide !== undefined && room.players.includes(guide.penguin) && /(hub|time machine|command center|portal)/.test(normalized)) {
      delay(900).then(async () => {
        if (this._running && room.players.includes(guide.penguin)) {
          await this._msg.send(room.players, 'sm', guide.penguin.id, 'would you like to see the time command center?');
          await delay(900);
          this._hub.requestTravelToHub(player.id);
        }
      }).catch(console.error);
      return;
    }

    if (room.id === TIME_HUB_ROOM_ID && /(time travel|next era|next update|advance|upgrade)/.test(normalized)) {
      const keeper = this._npcs.find(npc => npc.spec.id === 900009);
      if (keeper === undefined) {
        return;
      }

      delay(800).then(async () => {
        if (!this._running || !room.players.includes(keeper.penguin)) {
          return;
        }
        await this._msg.send(room.players, 'sm', keeper.penguin.id, 'the time machine is warming up');
        const result = await this._hub.advanceToNextEra(player).catch(() => 'the time machine malfunctioned');
        if (this._running && room.players.includes(keeper.penguin)) {
          await this._msg.send(room.players, 'sm', keeper.penguin.id, result);
        }
      }).catch(console.error);
      return;
    }

    const now = Date.now();
    const closest = this.getClosestNpc(player, room);
    const listeners = this._npcs.filter(npc => room.players.includes(npc.penguin) && npc.nextReply <= now);
    const speaker = closest !== undefined && listeners.includes(closest) ? closest : choose(listeners);
    if (speaker === undefined) {
      return;
    }

    const response = getPlayerResponse(message, player.name);
    if (response === undefined) {
      return;
    }

    speaker.nextReply = now + randomInt(8000, 20000);
    delay(randomInt(900, 2200)).then(() => {
      if (this._running && room.players.includes(speaker.penguin)) {
        return this._msg.send(room.players, 'sm', speaker.penguin.id, response).catch(console.error);
      }
    });
  }

  private async tick(): Promise<void> {
    const now = Date.now();
    for (const follower of this._npcs) {
      if (follower.followPlayerId === undefined || follower.followUntil === undefined) {
        continue;
      }

      const room = this._world.getPenguinRoom(follower.penguin);
      const target = room?.players.find(player => player.id === follower.followPlayerId);
      if (follower.followUntil <= now || room === undefined || target === undefined) {
        follower.followPlayerId = undefined;
        follower.followUntil = undefined;
        continue;
      }

      const targetState = room.getState(target);
      const currentState = room.getState(follower.penguin);
      if (Math.hypot(targetState.x - currentState.x, targetState.y - currentState.y) > 55) {
        room.updatePosition(follower.penguin, targetState.x, targetState.y);
        await this._msg.send(room.players, 'sp', follower.penguin.id, targetState.x, targetState.y);
      }
    }

    const npc = choose(this._npcs.filter(n => n.nextAction <= now));
    if (npc === undefined) {
      return;
    }

    npc.nextAction = now + randomInt(7000, 18000);
    const room = this._world.getPenguinRoom(npc.penguin);
    if (room === undefined) {
      return;
    }

    const action = randomInt(0, 99);
    if (npc.spec.stationary) {
      if (action < 35) {
        await this.say(npc, room);
      }
      return;
    }
    if (action < 45) {
      await this.move(npc.penguin, room);
    } else if (action < 70) {
      await this.say(npc, room);
    } else if (action < 90) {
      await this.converse(room);
    } else {
      await this.changeRoom(npc, room);
    }
  }

  private placeInRoom(penguin: WorldPenguin, roomId: number, x: number, y: number): void {
    const room = this._world.getRoom(roomId);
    room.addPenguin(penguin, x, y);
    this._world.enterState(penguin, { room });
    void this._msg.send(room.players, 'ap', getPenguinString(this._data, penguin, { x, y, frame: 1 })).catch(console.error);
  }

  private async move(penguin: WorldPenguin, room: WorldRoom): Promise<void> {
    const x = randomPosition();
    const y = randomPosition();
    room.updatePosition(penguin, x, y);
    await this._msg.send(room.players, 'sp', penguin.id, x, y);
  }

  private async say(npc: ActiveNpc, room: WorldRoom): Promise<void> {
    await this._msg.send(room.players, 'sm', npc.penguin.id, choose(npc.spec.phrases));
  }

  private async converse(room: WorldRoom): Promise<void> {
    const speakers = room.players.filter(p => this.isNpc(p.id));
    if (speakers.length < 2) {
      const npc = this.npcInRoom(room);
      if (npc !== undefined) {
        await this.say(npc, room);
      }
      return;
    }

    const first = choose(speakers);
    const second = choose(speakers.filter(p => p !== first));
    const lines = choose(CONVERSATIONS);

    await this._msg.send(room.players, 'sm', first.id, lines[0]);
    await delay(1500);
    if (!this._running || !room.players.includes(first) || !room.players.includes(second)) {
      return;
    }
    await this._msg.send(room.players, 'sm', second.id, lines[1]);

    if (lines[2] !== undefined) {
      await delay(1500);
      if (!this._running || !room.players.includes(first)) {
        return;
      }
      await this._msg.send(room.players, 'sm', first.id, lines[2]);
    }
  }

  private async changeRoom(npc: ActiveNpc, oldRoom: WorldRoom): Promise<void> {
    const destination = choose(ROOMS.filter(room => room !== oldRoom.id));
    const target = this._world.getRoom(destination);

    oldRoom.removePenguin(npc.penguin);
    await this._msg.send(
      oldRoom.players,
      'rp',
      npc.penguin.id,
      ...oldRoom.playerStates.map(([p, s]) => getPenguinString(this._data, p, s))
    );

    const x = randomPosition();
    const y = randomPosition();
    target.addPenguin(npc.penguin, x, y);
    this._world.enterState(npc.penguin, { room: target });
    await this._msg.send(target.players, 'ap', getPenguinString(this._data, npc.penguin, { x, y, frame: 1 }));
  }

  private npcInRoom(room: WorldRoom): ActiveNpc | undefined {
    return this._npcs.find(npc => room.players.includes(npc.penguin));
  }

  private isNpc(id: number): boolean {
    return this._npcs.some(npc => npc.penguin.id === id);
  }
}

const randomPosition = () => randomInt(180, 720);

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function getPlayerResponse(message: string, playerName: string): string | undefined {
  const match = PLAYER_RESPONSES.find(([pattern]) => pattern.test(message));
  if (match !== undefined) {
    const response = choose(match[1]);
    return /\b(hi|hello|hey|sup|yo)\b/i.test(message) ? response.replace('!', `, ${playerName}!`) : response;
  }

  return Math.random() < 0.3 ? choose(GENERIC_RESPONSES) : undefined;
}
