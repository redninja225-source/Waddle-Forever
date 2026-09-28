import { Update } from ".";

function getNewspaperIssue(date: string, edition: number, title: string): NonNullable<Update['issue']> {
  const paper = (file: string) => `svanilla:media/play/v2/content/local/en/news/papers/${date}/content/${file}`;
  return {
    type: 'as3',
    year: Number(date.slice(0, 4)),
    month: Number(date.slice(4, 6)),
    day: Number(date.slice(6, 8)),
    edition,
    title,
    askFront: paper('front/askAuntArctic.swf'),
    dividersFront: paper('front/dividers.swf'),
    featureStory: paper('front/featureStory.swf'),
    featureMore: paper('overlays/featureMore.swf'),
    headerFront: paper('front/header.swf'),
    navigationFront: paper('front/navigation.swf'),
    newsFlash: paper('front/newsFlash.swf'),
    supportStory: paper('front/supportStory.swf'),
    upcomingEvents: paper('front/upcomingEvents.swf'),
    askBack: paper('back/askAuntArctic.swf'),
    dividersBack: paper('back/dividers.swf'),
    headerBack: paper('back/header.swf'),
    jokes: paper('back/jokesAndRiddles.swf'),
    navigationBack: paper('back/navigation.swf'),
    submit: paper('back/submitYourContent.swf'),
    secrets: paper('back/secrets.swf'),
    secret: paper('overlays/secretOverlay.swf')
  };
}

export const UPDATES_2017: Update[] = [
  {
    date: '2017-01-04',
    end: ['party2'],
    issue: getNewspaperIssue('20170104', 564, 'NEW YEAR NEW HORIZON'),
    miscComments: [
      'The January Penguin Style and Furniture & Igloo catalogs are released',
      'The Passport Pin and Wink Emoji Pin are hidden around the island'
    ],
    rooms: {
      town: 'svanilla:media/play/v2/content/global/rooms/town.swf',
      rink: 'svanilla:media/play/v2/content/global/rooms/rink.swf',
      forts: 'svanilla:media/play/v2/content/global/rooms/forts.swf',
      plaza: 'svanilla:media/play/v2/content/global/rooms/plaza.swf',
      cove: 'svanilla:media/play/v2/content/global/rooms/cove.swf',
      dock: 'svanilla:media/play/v2/content/global/rooms/dock.swf',
      shack: 'svanilla:media/play/v2/content/global/rooms/shack.swf',
      forest: 'svanilla:media/play/v2/content/global/rooms/forest.swf',
      dojoext: 'svanilla:media/play/v2/content/global/rooms/dojoext.swf',
      village: 'svanilla:media/play/v2/content/global/rooms/village.swf',

      agent: 'archives:RoomsAgent.swf',
      agentcom: 'archives:RoomsAgentcom-2017.swf',
      agentlobbymulti: 'archives:RoomsAgentlobbymulti-2017.swf',
      agentlobbysolo: 'archives:RoomsAgentlobbysolo-2017.swf',
      beach: 'archives:RoomsBeach-2017.swf',
      berg: 'archives:RoomsBerg-2017.swf',
      agentvr: 'archives:RoomsAgentvr-2017.swf',
      attic: 'archives:RoomsAttic-2017.swf',
      beacon: 'archives:RoomsBeacon-2017.swf',
      boiler: 'archives:RoomsBoiler-2017.swf',
      book: 'archives:RoomsBook-2017.swf',
      boxdimension: 'archives:RoomsBoxdimension-2017.swf',
      cave: 'archives:RoomsCave-2017.swf',
      cavemine: 'archives:RoomsCavemine-2017.swf',
      cloudforest: 'archives:RoomsCloudforest-2017.swf',
      coffee: 'archives:RoomsCoffee-2017.swf',
      dance: 'archives:RoomsDance-2017.swf',
      dojo: 'archives:RoomsDojo-2017.swf',
      dojofire: 'archives:RoomsDojofire-2017.swf',
      dojohide: 'archives:RoomsDojohidesolo-2017.swf',
      dojosnow: 'archives:RoomsDojosnow-2017.swf',
      dojowater: 'archives:RoomsDojowater-2017.swf',
      eco: 'archives:RoomsEco-2017.swf',
      hotellobby: 'archives:RoomsHotellobby-2017.swf',
      hotelroof: 'archives:RoomsHotelroof-2017.swf',
      hotelspa: 'archives:RoomsHotelspa-2017.swf',
      lake: 'archives:RoomsLake-2017.swf',
      light: 'archives:RoomsLight-2017.swf',
      lodge: 'archives:RoomsLodge-2017.swf',
      lounge: 'archives:RoomsLounge-2017.swf',
      mine: 'archives:RoomsMine-2017.swf',
      mtn: 'archives:RoomsMtn-2017.swf',
      pet: 'archives:RoomsPet-2017.swf',
      pizza: 'archives:RoomsPizza-2017.swf',
      school: 'archives:RoomsSchool-2017.swf',
      ship: 'archives:RoomsShip-2017.swf',
      shiphold: 'archives:RoomsShiphold-2017.swf',
      shipnest: 'archives:RoomsShipnest-2017.swf',
      shipquarters: 'archives:RoomsShipquarters-2017.swf',
      shop: 'archives:RoomsShop-2017.swf',
      sport: 'archives:RoomsSport-2017.swf',
      stage: 'archives:RoomsStage-2017.swf',
      underwater: 'archives:RoomsUnderwater-21April2015.swf'
    },
    globalChanges: {
      'rooms/agentlobby.swf': 'archives:RoomsAgentlobby-2017.swf',
      'rooms/dojoextsolo.swf': 'archives:RoomsDojoextsolo-2017.swf',
      'rooms/dojohidesolo.swf': 'archives:RoomsDojohidesolo-2017.swf',
      'rooms/dojosecret.swf': 'archives:RoomsDojosecret-2017.swf',
      'rooms/lobby.swf': 'archives:RoomsLobby-2017.swf',
      'rooms/mall.swf': 'archives:RoomsMall-2017.swf',
      'rooms/park.swf': 'archives:RoomsPark-2017.swf',
      'rooms/pufflewild.swf': 'archives:RoomsPufflewild-2017.swf',
      'rooms/skatepark.swf': 'archives:RoomsSkatepark-2017.swf',
      'rooms/welcomesolo.swf': 'archives:RoomsWelcomesolo-2017.swf',
      'telescope/telescope.swf': 'archives:Telescope-2017.swf'
    },
    music: {
      town: 1160,
      coffee: 1163,
      book: 669,
      dance: 1165,
      lounge: 674,
      school: 436,
      shop: 1173,
      village: 1174,
      lodge: 589,
      attic: 884,
      mtn: 1174,
      plaza: 1170,
      pet: 659,
      dojo: 403,
      dojoext: 1166,
      dojohide: 404,
      agent: 7,
      agentcom: 642,
      agentlobbymulti: 1167,
      pizza: 676,
      beach: 582,
      light: 588,
      beacon: 583,
      ship: 380,
      shiphold: 491,
      shipquarters: 491,
      shipnest: 492,
      hotellobby: 362,
      hotelspa: 361,
      hotelroof: 360,
      cloudforest: 363,
      dock: 1162,
      forts: 1169,
      rink: 1171,
      boiler: 667,
      berg: 584,
      cave: 670,
      shack: 1172,
      mine: 675,
      forest: 1168,
      cove: 1164,
      boxdimension: 372,
      dojofire: 405,
      cavemine: 532,
      lake: 666,
      underwater: 671,
      dojowater: 406,
      dojosnow: 407
    },
    temp: {
      party: {
        partyName: 'Club Penguin Island Party',
        partyIcon: 'party',
        rooms: {
          beach: 'archives:RoomsBeach-ClubPenguinIslandParty.swf',
          dock: 'archives:RoomsDock-ClubPenguinIslandParty.swf',
          forest: 'archives:RoomsForest-ClubPenguinIslandParty.swf',
          forts: 'archives:RoomsForts-ClubPenguinIslandParty.swf',
          plaza: 'archives:RoomsPlaza-ClubPenguinIslandParty.swf',
          town: 'archives:RoomsTown-ClubPenguinIslandParty.swf',
          village: 'archives:RoomsVillage-ClubPenguinIslandParty.swf'
        },
        music: {
          beach: 1155,
          dock: 1156,
          forest: 1157,
          forts: 1158,
          plaza: 1159,
          town: 1160,
          village: 1161,
          mtn: 1161
        },
        globalChanges: {
          'content/features.swf': 'archives:ContentFeatures-ClubPenguinIslandParty.swf',
          'content/interface.swf': 'archives:ContentInterface-ClubPenguinIslandParty.swf',
          'content/party.swf': 'archives:ContentParty-ClubPenguinIslandParty.swf',
          'content/party_icon.swf': 'archives:ContentParty_icon-ClubPenguinIslandParty.swf',
          'content/prompts.swf': 'archives:ContentPrompts-ClubPenguinIslandParty.swf',
          'logo/logo.swf': 'archives:ContentLogo-ClubPenguinIslandParty.swf',
          'membership/party1.swf': 'archives:MembershipParty1-ClubPenguinIslandParty.swf'
        },
        localChanges: {
          'close_ups/character_dialogue_login.swf': {
            en: 'archives:Close_ups170104_character_dialogue_login-ClubPenguinIslandParty.swf'
          },
          'close_ups/character_dialogue_town_jacket.swf': {
            en: 'archives:Close_ups170104_dialogue_town_jacket-ClubPenguinIslandParty.swf'
          },
          'close_ups/character_dialogue_activities.swf': {
            en: 'archives:Close_ups170104_dialogue_activities-ClubPenguinIslandParty.swf'
          },
          'close_ups/character_dialogue_adventures.swf': {
            en: 'archives:Close_ups170104_dialogue_adventures-ClubPenguinIslandParty.swf'
          },
          'close_ups/character_dialogue_entertainment.swf': {
            en: 'archives:Close_ups170104_dialogue_entertainment-ClubPenguinIslandParty.swf'
          },
          'close_ups/character_dialogue_fashion.swf': {
            en: 'archives:Close_ups170104_dialogue_fashion-ClubPenguinIslandParty.swf'
          },
          'close_ups/character_dialogue_food.swf': {
            en: 'archives:Close_ups170104_dialogue_food-ClubPenguinIslandParty.swf'
          },
          'close_ups/character_dialogue_friends.swf': {
            en: 'archives:Close_ups170104_dialogue_friends-ClubPenguinIslandParty.swf'
          },
          'close_ups/character_dialogue_goto_activities.swf': {
            en: 'archives:Close_ups170104_dialogue_goto_activities-ClubPenguinIslandParty.swf'
          },
          'close_ups/character_dialogue_goto_adventures.swf': {
            en: 'archives:Close_ups170104_dialogue_goto_adventures-ClubPenguinIslandParty.swf'
          },
          'close_ups/character_dialogue_goto_entertainment.swf': {
            en: 'archives:Close_ups170104_dialogue_goto_entertainment-ClubPenguinIslandParty.swf'
          },
          'close_ups/character_dialogue_goto_fashion.swf': {
            en: 'archives:Close_ups170104_dialogue_goto_fashion-ClubPenguinIslandParty.swf'
          },
          'close_ups/character_dialogue_goto_food.swf': {
            en: 'archives:Close_ups170104_dialogue_goto_food-ClubPenguinIslandParty.swf'
          },
          'close_ups/character_dialogue_goto_friends.swf': {
            en: 'archives:Close_ups170104_dialogue_goto_friends-ClubPenguinIslandParty.swf'
          },
          'close_ups/quest_interface.swf': {
            en: 'archives:Close_upsQuest_interface-ClubPenguinIslandParty.swf'
          }
        },
        partyIconFile: 'archives:ContentParty_icon-ClubPenguinIslandParty.swf'
      }
    }
  },
  {
    date: '2017-01-18',
    miscComments: [
      'The igloo music list is updated',
      'The final Club Penguin Island Party quest dialogue is unlocked'
    ],
    temp: {
      party3: {
        update: 'The final Club Penguin Island Party quest dialogue is available',
        localChanges: {
          'close_ups/character_dialogue_final.swf': {
            en: 'archives:Close_ups170118_character_dialogue_final-ClubPenguinIslandParty.swf'
          }
        }
      }
    }
  },
  {
    date: '2017-01-26',
    miscComments: ['A new pin is hidden around the island']
  },
  {
    date: '2017-02-01',
    end: ['party', 'party3'],
    issue: getNewspaperIssue('20170201', 565, 'WADDLING ON'),
    miscComments: [
      'The February Penguin Style and Furniture & Igloo catalogs are released',
      'The Community Pin and Puffle Trivia Pin are hidden around the island'
    ],
    temp: {
      party2: {
        partyName: 'Waddle On Party',
        partyIcon: 'party',
        rooms: {
          agentlobbymulti: 'archives:RoomsAgentlobbymulti-WaddleOnParty.swf',
          berg: 'archives:RoomsBerg-WaddleOnParty.swf',
          cove: 'archives:RoomsCove-WaddleOnParty.swf',
          dock: 'archives:RoomsDock-WaddleOnParty.swf',
          dojoext: 'archives:RoomsDojoext-WaddleOnParty.swf',
          forest: 'archives:RoomsForest-WaddleOnParty.swf',
          forts: 'archives:RoomsForts-WaddleOnParty.swf',
          plaza: 'archives:RoomsPlaza-WaddleOnParty.swf',
          rink: 'archives:RoomsRink-WaddleOnParty.swf',
          shack: 'archives:RoomsShack-WaddleOnParty.swf',
          town: 'archives:RoomsTown-WaddleOnParty.swf',
          village: 'archives:RoomsVillage-WaddleOnParty.swf'
        },
        music: {
          agentlobbymulti: 1167,
          berg: 584,
          book: 669,
          coffee: 1163,
          cove: 1164,
          dance: 1165,
          dock: 1162,
          dojoext: 1166,
          forest: 1168,
          forts: 1169,
          mtn: 1174,
          plaza: 1170,
          rink: 1171,
          shack: 1172,
          shop: 1173,
          town: 1160,
          village: 1174
        },
        globalChanges: {
          'content/features.swf': 'archives:ContentFeatures-WaddleOnParty.swf',
          'content/interface.swf': 'archives:ContentInterface-WaddleOnParty.swf',
          'content/party.swf': 'archives:ContentParty-WaddleOnParty.swf',
          'content/party_icon.swf': 'archives:ContentParty_icon-WaddleOnParty.swf',
          'content/prompts.swf': 'archives:ContentPrompts-WaddleOnParty.swf',
          'logo/logo.swf': 'archives:LogoLogo-WaddleOnParty.swf',
          'membership/party1.swf': 'archives:MembershipParty1-WaddleOnParty.swf'
        },
        fileChanges: {
          'play/v2/client/interface.swf': 'archives:ClientInterface-WaddleOnParty.swf'
        },
        localChanges: {
          'close_ups/character_dialogue_login.swf': {
            en: 'archives:Close_ups170201_character_dialogue_login-WaddleOnParty.swf'
          },
          'close_ups/character_dialogue_town_jacket.swf': {
            en: 'archives:Close_ups170104_dialogue_town_jacket-WaddleOnParty.swf'
          },
          'close_ups/character_dialogue_task1_start.swf': {
            en: 'archives:Close_ups170201_dialogue_task1_start-WaddleOnParty.swf'
          },
          'close_ups/character_dialogue_task2_start.swf': {
            en: 'archives:Close_ups170201_dialogue_task2_start-WaddleOnParty.swf'
          },
          'close_ups/character_dialogue_task3_start.swf': {
            en: 'archives:Close_ups170201_dialogue_task3_start-WaddleOnParty.swf'
          },
          'close_ups/character_dialogue_task4_start.swf': {
            en: 'archives:Close_ups170201_dialogue_task4_start-WaddleOnParty.swf'
          },
          'close_ups/character_dialogue_task5_start.swf': {
            en: 'archives:Close_ups170201_dialogue_task5_start-WaddleOnParty.swf'
          },
          'close_ups/character_dialogue_task6_start.swf': {
            en: 'archives:Close_ups170201_dialogue_task6_start-WaddleOnParty.swf'
          },
          'close_ups/character_dialogue_task7_start.swf': {
            en: 'archives:Close_ups170201_dialogue_task7_start-WaddleOnParty.swf'
          },
          'close_ups/character_dialogue_task1_congrats.swf': {
            en: 'archives:Close_ups170201_dialogue_task1_congrats-WaddleOnParty.swf'
          },
          'close_ups/character_dialogue_task2_congrats.swf': {
            en: 'archives:Close_ups170201_dialogue_task2_congrats-WaddleOnParty.swf'
          },
          'close_ups/character_dialogue_task3_congrats.swf': {
            en: 'archives:Close_ups170201_dialogue_task3_congrats-WaddleOnParty.swf'
          },
          'close_ups/character_dialogue_task4_congrats.swf': {
            en: 'archives:Close_ups170201_dialogue_task4_congrats-WaddleOnParty.swf'
          },
          'close_ups/character_dialogue_task5_congrats.swf': {
            en: 'archives:Close_ups170201_dialogue_task5_congrats-WaddleOnParty.swf'
          },
          'close_ups/character_dialogue_task6_congrats.swf': {
            en: 'archives:Close_ups170201_dialogue_task6_congrats-WaddleOnParty.swf'
          },
          'close_ups/character_dialogue_task7_congrats.swf': {
            en: 'archives:Close_ups170201_dialogue_task7_congrats-WaddleOnParty.swf'
          },
          'close_ups/character_dialogue_alltasks_congrats.swf': {
            en: 'archives:Close_ups170201_dialogue_alltasks_congrats-WaddleOnParty.swf'
          },
          'close_ups/character_dialogue_iceberg_congrats.swf': {
            en: 'archives:Close_ups170201_dialogue_iceberg_congrats-WaddleOnParty.swf'
          },
          'close_ups/character_dialogue_iceberg_plaque.swf': {
            en: 'archives:Close_ups170201_dialogue_iceberg_plaque-WaddleOnParty.swf'
          },
          'close_ups/quest_interface.swf': {
            en: 'archives:Close_upsQuest_interface-WaddleOnParty.swf'
          }
        },
        partyIconFile: 'archives:ContentParty_icon-WaddleOnParty.swf'
      }
    }
  },
  {
    date: '2017-02-03',
    partyComment: 'The spy-themed Waddle On scavenger activity is unlocked'
  },
  {
    date: '2017-02-04',
    partyComment: 'The party-themed Waddle On scavenger activity is unlocked'
  },
  {
    date: '2017-02-06',
    partyComment: 'The item-themed Waddle On scavenger activity is unlocked'
  },
  {
    date: '2017-02-08',
    partyComment: 'The ninja-themed Waddle On scavenger activity is unlocked'
  },
  {
    date: '2017-02-10',
    partyComment: 'The game-themed Waddle On scavenger activity is unlocked'
  },
  {
    date: '2017-02-11',
    partyComment: 'The history-themed Waddle On scavenger activity is unlocked'
  },
  {
    date: '2017-02-16',
    miscComments: ['Club Penguin Island pre-registration ends']
  },
  {
    date: '2017-03-22',
    issue: getNewspaperIssue('20170322', 566, 'PENGUINS UNITED'),
    temp: {
      party3: {
        update: 'Waddle On Party fireworks begin',
        rooms: {
          forts: 'archives:RoomsForts-WaddleOnParty_2.swf',
          plaza: 'archives:RoomsPlaza-WaddleOnParty_2.swf',
          town: 'archives:RoomsTown-WaddleOnParty_2.swf'
        },
        localChanges: {
          'close_ups/character_dialogue_login.swf': {
            en: 'archives:Close_ups170322_character_dialogue_login-WaddleOnParty.swf'
          }
        }
      }
    }
  },
  {
    date: '2017-03-29',
    miscComments: [
      'The all-access party pass is released',
      'Club Penguin\'s Flash game closes at the end of the day'
    ]
  },
  {
    date: '2017-03-30',
    end: ['party2', 'party3'],
    miscComments: ['Club Penguin\'s Flash game is discontinued']
  }
];
