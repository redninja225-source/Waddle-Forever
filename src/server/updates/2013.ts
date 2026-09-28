import { Update } from ".";
import { CategoryID } from "../game-data/stamps";
import { mergeIssueUpdates, NEWSPAPER_ISSUES_2013 } from "./newspaper-issues";

const BASE_UPDATES_2013: Update[] = [
  {
    date: '2013-01-04',
    end: ['party']
  },
  {
    date: '2013-01-10',
    temp: {
      const: {
        rooms: {
          forts: 'archives:PrehistoricPartyConstForts.swf',
          party1: 'archives:PrehistoricPartyConstParty1.swf'
        }
      }
    }
  },
  {
    date: '2013-01-17',
    temp: {
      party: {
        partyName: 'Prehistoric Party',
        rooms: {
          forts: 'archives:PrehistoricPartyForts.swf',
          party1: 'archives:PrehistoricPartyParty1.swf',
          party2: 'archives:PrehistoricPartyParty2.swf',
          party3: 'archives:PrehistoricPartyParty3.swf',
          party4: 'archives:PrehistoricPartyParty4.swf',
          party5: 'archives:PrehistoricPartyParty5.swf',
          party6: 'archives:PrehistoricPartyParty6.swf',
          party7: 'archives:PrehistoricPartyParty7.swf',
          party8: 'archives:PrehistoricPartyParty8.swf',
          party9: 'archives:PrehistoricPartyParty9.swf',
          party10: 'archives:PrehistoricPartyParty10.swf',
          party11: 'archives:PrehistoricPartyParty11.swf',
          party12: 'archives:PrehistoricPartyParty12.swf'
        },
        music: {
          party1: 348,
          party2: 348,
          party3: 350,
          party4: 350,
          party5: 350,
          party6: 350,
          party7: 350,
          party8: 348,
          party9: 348,
          party10: 350,
          party11: 348,
          party12: 349
        },
        startscreens: [
          'archives:SwfPrehistoric-2.swf',
          'archives:SwfPrehistoric-3.swf',
          'archives:SwfPrehistoric-4.swf'
        ],
        localChanges: {
          'catalogues/party.swf': {
            en: 'archives:ENPrehistoricPartyCatalog.swf'
          },
          'close_ups/map_interface.swf': {
            en: 'archives:ENCloseUpsMapInterface-PrehistoricParty.swf'
          },
          'close_ups/quest_interface.swf': {
            en: 'archives:ENQuestInterface.swf'
          }
        },
        mapNote: 'archives:ENPrehistoricPartyMapNote.swf',
        partyIconFile: 'archives:PrehistoricPartyIcon.swf'
      }
    }
  },
  {
    date: '2013-01-30',
    end: ['party']
  },
  {
    date: '2013-02-14',
    temp: {
      party: {
        partyName: 'Hollywood Party',
        rooms: {
          attic: 'archives:HollywoodPartyRoomsAttic.swf',
          beach: 'archives:HollywoodPartyRoomsBeach.swf',
          beacon: 'archives:HollywoodPartyRoomsBeacon.swf',
          berg: 'archives:HollywoodPartyRoomsBerg.swf',
          book: 'archives:HollywoodPartyRoomsBook.swf',
          coffee: 'archives:HollywoodPartyRoomsCoffee.swf',
          cove: 'archives:HollywoodPartyRoomsCove.swf',
          dance: 'archives:HollywoodPartyRoomsDance.swf',
          dock: 'archives:HollywoodPartyRoomsDock.swf',
          dojo: 'archives:HollywoodPartyRoomsDojo.swf',
          dojoext: 'archives:HollywoodPartyRoomsDojoext.swf',
          dojofire: 'archives:HollywoodPartyRoomsDojofire.swf',
          dojohide: 'archives:HollywoodPartyRoomsDojohide.swf',
          forest: 'archives:HollywoodPartyRoomsForest.swf',
          forts: 'archives:HollywoodPartyRoomsForts1.swf',
          lodge: 'archives:HollywoodPartyRoomsLodge.swf',
          mtn: 'archives:HollywoodPartyRoomsMtn.swf',
          party1: 'archives:HollywoodPartyRoomsParty1.swf',
          party2: 'archives:HollywoodPartyRoomsParty2.swf',
          party3: 'archives:HollywoodPartyRoomsParty3.swf',
          party4: 'archives:HollywoodPartyRoomsParty4.swf',
          pet: 'archives:HollywoodPartyRoomsPet.swf',
          pizza: 'archives:HollywoodPartyRoomsPizza.swf',
          plaza: 'archives:HollywoodPartyRoomsPlaza.swf',
          rink: 'archives:HollywoodPartyRoomsRink.swf',
          shack: 'archives:HollywoodPartyRoomsShack.swf',
          shop: 'archives:HollywoodPartyRoomsShop.swf',
          stage: 'archives:HollywoodPartyRoomsStage.swf',
          town: 'archives:RoomsTown-HollywoodParty.swf',
          village: 'archives:HollywoodPartyRoomsVillage.swf'
        },
        music: {
          shop: 352,
          coffee: 353,
          party1: 355,
          party2: 359,
          party4: 356,
          pizza: 352,
          plaza: 354,
          forts: 357,
          party3: 358,
          town: 360
        },
        startscreens: [
          'archives:SwfHollywood-1.swf',
          'archives:SwfHollywood-2.swf',
          'archives:SwfHollywood-3.swf'
        ],
        globalChanges: {
          'avatar/sprites/starpenguin.swf': 'archives:Hollywood2013GlobalPenguinStarpenguin.swf',
          'rooms/effects/avatar.swf': 'archives:Hollywood2013GlobalRoomsEffectsAvatar.swf'
        }
      }
    }
  },
  {
    date: '2013-02-28',
    end: ['party']
  },
  {
    date: '2013-03-07',
    temp: {
      const: {
        rooms: {
          dock: 'archives:PuffleParty2013Construction-Dock.swf',
          forest: 'archives:PuffleParty2013Construction-Forest.swf',
          pet: 'archives:PuffleParty2013Construction-Pet.swf',
          plaza: 'archives:PuffleParty2013Construction-Plaza.swf',
          village: 'archives:PuffleParty2013Construction-Village.swf'
        }
      }
    }
  },
  {
    date: '2013-03-14',
    temp: {
      const: {
        rooms: {
          plaza: 'archives:PuffleParty2013Construction-Plaza_2.swf'
        }
      }
    }
  },
  {
    date: '2013-03-21',
    dateReference: 'hotel',
    temp: {
      party: {
        partyName: 'Puffle Party 2013',
        rooms: {
          beach: 'archives:RoomsBeach-PuffleParty2013.swf',
          beacon: 'archives:RoomsBeacon-PuffleParty2013.swf',
          berg: 'archives:RoomsBerg-PuffleParty2013.swf',
          boxdimension: 'archives:RoomsBoxDimension-PuffleParty2013.swf',
          cave: 'archives:RoomsCave-PuffleParty2013.swf',
          cloudforest: 'archives:RoomsCloudForest-PuffleParty2013.swf',
          cove: 'archives:RoomsCove-PuffleParty2013.swf',
          dance: 'archives:RoomsDance-PuffleParty2013.swf',
          dock: 'archives:RoomsDock-PuffleParty2013.swf',
          forts: 'archives:RoomsForts-PuffleParty2013.swf',
          hotellobby: 'archives:RoomsHotelLobby-PuffleParty2013.swf',
          hotelroof: 'archives:RoomsHotelRoof-PuffleParty2013.swf',
          hotelspa: 'archives:RoomsHotelSpa-PuffleParty2013.swf',
          light: 'archives:RoomsLight-PuffleParty2013.swf',
          lodge: 'archives:RoomsLodge-PuffleParty2013.swf',
          lounge: 'archives:RoomsLounge-PuffleParty2013.swf',
          mtn: 'archives:RoomsMtn-PuffleParty2013.swf',
          party1: 'archives:PuffleParty2013-Party1.swf',
          party2: 'archives:PuffleParty2013-Party2.swf',
          pet: 'archives:RoomsPet-PuffleParty2013.swf',
          plaza: 'archives:RoomsPlaza-PuffleParty2013.swf',
          town: 'archives:RoomsTown-PuffleParty2013.swf',
          village: 'archives:RoomsVillage-PuffleParty2013.swf'
        },
        music: {
          hotelroof: 360,
          hotelspa: 361,
          hotellobby: 362,
          cloudforest: 363,
          light: 364,
          cave: 366,
          cove: 367,
          pet: 368,
          party2: 368,
          lodge: 368,
          plaza: 369,
          party1: 369,
          forts: 369,
          town: 369,
          mtn: 370,
          village: 370,
          beach: 371,
          beacon: 371,
          dock: 371,
          berg: 371,
          dance: 373,
          lounge: 374
        },
        startscreens: [
          'archives:SwfPuffle-party-1.swf',
          'archives:SwfPuffle-party-2.swf'
        ],
        localChanges: {
          'catalogues/party.swf': {
            en: 'archives:ENPuffleParty2013-PartyCatalog.swf'
          },
          'close_ups/party_map_note.swf': {
            en: 'archives:ENClose_upsParty_map_note.swf'
          },
          'close_ups/puffle_choose.swf': {
            en: 'archives:ENClose_upsPuffle_choose.swf'
          },
          'close_ups/hotel_elevator.swf': {
            en: 'archives:ENClose_upsHotel_elevator.swf'
          },
          'close_ups/rainbow_cannon_prompt.swf': {
            en: 'archives:ENClose_upsRainbow_cannon_prompt.swf'
          },
          'close_ups/rainbow_puffle_quest.swf': {
            en: 'archives:ENClose_upsRainbow_puffle_quest.swf'
          }
        },
        fileChanges: {
          'play/v2/client/interface.swf': 'archives:ClientInterfacePuffleParty2013.swf'
        }
      }
    }
  },
  {
    date: '2013-04-05',
    end: ['party']
  },
  {
    date: '2013-04-18',
    temp: {
      const: {
        rooms: {
          beach: 'archives:RoomsBeach-MarvelSuperHeroTakeover2013Construction.swf',
          dock: 'archives:RoomsDock-MarvelSuperHeroTakeover2013Construction.swf',
          forest: 'archives:RoomsForest-MarvelSuperHeroTakeover2013Construction.swf',
          forts: 'archives:RoomsForts-MarvelSuperHeroTakeover2013Construction.swf'
        }
      }
    }
  },
  {
    date: '2013-04-25',
    temp: {
      party: {
        partyName: 'Marvel Super Hero Takeover 2013',
        rooms: {
          beach: 'archives:RoomsBeach-Marvel2013.swf',
          cove: 'archives:RoomsCove-Marvel2013.swf',
          dock: 'archives:RoomsDock-Marvel2013.swf',
          forest: 'archives:RoomsForest-Marvel2013.swf',
          forts: 'archives:RoomsForts-Marvel2013.swf',
          light: 'archives:RoomsLight-Marvel2013.swf',
          party1: 'archives:RoomsParty1-Marvel2013.swf',
          party2: 'archives:RoomsParty2-Marvel2013.swf',
          party3: 'archives:RoomsParty3-Marvel2013.swf',
          pizza: 'archives:RoomsPizza-Marvel2013.swf',
          plaza: 'archives:RoomsPlaza-Marvel2013.swf',
          stage: 'archives:RoomsStage-Marvel2013.swf',
          town: 'archives:RoomsTown-Marvel2013.swf'
        },
        music: {
          dock: 389,
          plaza: 389,
          forts: 389,
          stage: 391,
          town: 389
        },
        startscreens: [
          'archives:ENMarvelSuperHeroTakeover2013LoginScreen1.swf',
          'archives:ENMarvelSuperHeroTakeover2013LoginScreen2.swf',
          'archives:ENMarvelSuperHeroTakeover2013LoginScreen3.swf'
        ],
        localChanges: {
          'catalogues/party.swf': {
            en: 'archives:ENCataloguesParty-Marvel2013.swf'
          },
          'close_ups/hero_endscreen.swf': {
            en: 'archives:ENCloseUpsHeroEndscreen.swf'
          },
          'close_ups/hero_interface.swf': {
            en: 'archives:ENCloseUpsHeroInterface.swf'
          },
          'close_ups/splashscreen.swf': {
            en: 'archives:ENCloseUpsSplashscreen.swf'
          },
          'close_ups/villain_endscreen.swf': {
            en: 'archives:ENCloseUpsVillainEndscreen.swf'
          },
          'close_ups/villain_interface.swf': {
            en: 'archives:ENCloseUpsVillainInterface.swf'
          }
        },
        globalChanges: {
          'membership/party1.swf': 'archives:ENMembershipParty1-Marvel2013.swf',
          'membership/party2.swf': 'archives:ENMembershipParty2-Marvel2013.swf',
          'membership/party3.swf': 'archives:ENMembershipParty3-Marvel2013.swf'
        }
      }
    }
  },
  {
    date: '2013-05-08',
    end: ['party']
  },
  {
    date: '2013-05-16',
    temp: {
      const: {
        rooms: {
          dojoext: 'archives:RoomsDojoext-CardJitsuParty2013.swf',
          dojohide: 'archives:RoomsDojohide-CardJitsuParty2013.swf'
        },
        music: {
          dojoext: 398,
          dojohide: 399
        }
      }
    }
  },
  {
    date: '2013-05-22',
    martialArtworks: 'archives:ENCataloguesNinja-May2013.swf',
    temp: {
      const: {
        rooms: {
          dojo: 'archives:RoomsDojo2-CardJitsuParty2013.swf',
          dojoext: 'archives:RoomsDojoext2-CardJitsuParty2013.swf',
          dojohide: 'archives:RoomsDojohide2-CardJitsuParty2013.swf'
        },
        music: {
          dojo: 400,
          dojoext: 401,
          dojohide: 402
        },
        globalChanges: {
          'music/400.swf': 'archives:MusicNew400.swf',
          'music/401.swf': 'archives:MusicNew401.swf',
          'music/402.swf': 'archives:MusicNew402.swf'
        }
      }
    }
  },
  {
    date: '2013-05-23',
    dateReference: 'dojosnow',
    rooms: {
      dojo: 'archives:RoomsDojo_5.swf',
      dojoext: 'archives:RoomsDojoext_6.swf',
      dojosnow: 'archives:RoomsDojosnow.swf'
    },
    stampUpdates: [
      {
        category:   {
          "name": "Card-Jitsu : Snow",
          "description": "Card-Jitsu Snow",
          "parent_group_id": 8,
          "display": "Games : Card-Jitsu : Snow",
          "group_id": 60,
          "stamps": [
            {
              "stamp_id": 485,
              "name": "3 Combos",
              "is_member": 0,
              "rank": 3,
              "description": "Play 3 Power Card Combos in a battle",
              "rank_token": "hard"
            },
            {
              "stamp_id": 467,
              "name": "3 Ninja Combo",
              "is_member": 0,
              "rank": 2,
              "description": "Play a Power Card in the same turn as all ninjas",
              "rank_token": "medium"
            },
            {
              "stamp_id": 468,
              "name": "4 Ninja Combo",
              "is_member": 0,
              "rank": 3,
              "description": "Play a Power Card in the same turn as all ninjas & Sensei",
              "rank_token": "hard"
            },
            {
              "stamp_id": 473,
              "name": "Bonus Win",
              "is_member": 0,
              "rank": 4,
              "description": "Defeat all Snow Minions in a Bonus Round",
              "rank_token": "extreme"
            },
            {
              "stamp_id": 486,
              "name": "Final Battle",
              "is_member": 0,
              "rank": 4,
              "description": "Defeat the master of Snow",
              "rank_token": "extreme"
            },
            {
              "stamp_id": 482,
              "name": "Fire Blast",
              "is_member": 0,
              "rank": 3,
              "description": "Blast 3 Snow Minions with 1 Fire Power Card",
              "rank_token": "hard"
            },
            {
              "stamp_id": 483,
              "name": "Fire Blast Combo",
              "is_member": 0,
              "rank": 3,
              "description": "Blast 3 Snow Minions with 1 Fire Power Card in a Combo",
              "rank_token": "hard"
            },
            {
              "stamp_id": 470,
              "name": "Fire Ninja",
              "is_member": 0,
              "rank": 0,
              "description": "Win 3 Rounds as a Fire Ninja",
              "rank_token": "none specified"
            },
            {
              "stamp_id": 472,
              "name": "Full Health",
              "is_member": 0,
              "rank": 4,
              "description": "Reach a Full Health Bonus Round",
              "rank_token": "extreme"
            },
            {
              "stamp_id": 477,
              "name": "Heal 15",
              "is_member": 0,
              "rank": 3,
              "description": "Heal a ninja 15 times in a battle",
              "rank_token": "hard"
            },
            {
              "stamp_id": 478,
              "name": "Huge Heal",
              "is_member": 0,
              "rank": 2,
              "description": "Heal all ninjas with 1 Snow Power Card",
              "rank_token": "medium"
            },
            {
              "stamp_id": 484,
              "name": "Power Card Pro",
              "is_member": 0,
              "rank": 2,
              "description": "Play 3 Power Cards in a battle",
              "rank_token": "medium"
            },
            {
              "stamp_id": 474,
              "name": "Revive",
              "is_member": 0,
              "rank": 1,
              "description": "Revive a ninja",
              "rank_token": "easy"
            },
            {
              "stamp_id": 469,
              "name": "Snow Ninja",
              "is_member": 0,
              "rank": 1,
              "description": "Win 3 Rounds as a Snow Ninja",
              "rank_token": "easy"
            },
            {
              "stamp_id": 487,
              "name": "Snow Pro",
              "is_member": 0,
              "rank": 2,
              "description": "Earn the gem. Finish over half of your Snow journey.",
              "rank_token": "medium"
            },
            {
              "stamp_id": 479,
              "name": "Snow Shield",
              "is_member": 0,
              "rank": 2,
              "description": "Shield other ninjas in a Snow Power Card Combo",
              "rank_token": "medium"
            },
            {
              "stamp_id": 476,
              "name": "Team Revival",
              "is_member": 0,
              "rank": 3,
              "description": "Win after all ninjas have fallen and been revived",
              "rank_token": "hard"
            },
            {
              "stamp_id": 480,
              "name": "Tidal Wave",
              "is_member": 0,
              "rank": 3,
              "description": "Damage 3 Snow Minions with 1 Water Power Card",
              "rank_token": "hard"
            },
            {
              "stamp_id": 475,
              "name": "Up and at 'em",
              "is_member": 0,
              "rank": 2,
              "description": "Get revived and still win the battle",
              "rank_token": "medium"
            },
            {
              "stamp_id": 471,
              "name": "Water Ninja",
              "is_member": 0,
              "rank": 1,
              "description": "Win 3 Rounds as a Water Ninja",
              "rank_token": "easy"
            },
            {
              "stamp_id": 481,
              "name": "Wave Boost",
              "is_member": 0,
              "rank": 2,
              "description": "Boost all ninja attacks in a Water Power Card Combo",
              "rank_token": "medium"
            }
          ]
        }
      },
      {
        categoryId: CategoryID.Activities,
        stamps: [
          {
            stamp_id: 488,
            rank: 4,
            rank_token: 'extreme',
            name: '3 Gems',
            is_member: 0,
            description: 'Earn the Fire, Water, and Snow Gems'
          }
        ]
      }
    ],
    temp: {
      party: {
        partyName: 'Card-Jitsu Party',
        rooms: {
          beach: 'archives:RoomsBeach-CardJitsuParty2013.swf',
          coffee: 'archives:RoomsCoffee-CardJitsuParty2013.swf',
          cove: 'archives:RoomsCove-CardJitsuParty2013.swf',
          dock: 'archives:RoomsDock-CardJitsuParty2013.swf',
          dojo: 'archives:RoomsDojo-CardJitsuParty2013.swf',
          forest: 'archives:RoomsForest-CardJitsuParty2013.swf',
          forts: 'archives:RoomsForts-CardJitsuParty2013.swf',
          lodge: 'archives:RoomsLodge-CardJitsuParty2013.swf',
          mtn: 'archives:RoomsMtn-CardJitsuParty2013.swf',
          party1: 'archives:RoomsParty1-CardJitsuParty2013.swf',
          pizza: 'archives:RoomsPizza-CardJitsuParty2013.swf',
          plaza: 'archives:RoomsPlaza-CardJitsuParty2013.swf',
          rink: 'archives:RoomsRink-CardJitsuParty2013.swf',
          town: 'archives:RoomsTown-CardJitsuParty2013.swf',
          village: 'archives:RoomsVillage-CardJitsuParty2013.swf'
        },
        music: {
          beach: 408,
          coffee: 409,
          cove: 410,
          dock: 408,
          forest: 410,
          party1: 413,
          pizza: 414,
          plaza: 411,
          mtn: 407,
          lodge: 412,
          village: 416,
          forts: 411,
          rink: 415,
          town: 411
        },
        startscreens: [
          'archives:ENCardJitsuSnowLoginScreen1.swf',
          'archives:ENCardJitsuSnowLoginScreen2.swf',
          'archives:ENCardJitsuSnowLoginScreen3.swf'
        ],
        localChanges: {
          'close_ups/poster.swf': {
            en: 'archives:ENClose_upsPoster-CardJitsuParty2013.swf'
          },
          'catalogues/party.swf': {
            en: 'archives:ENCataloguesParty-CardJitsuParty2013.swf'
          }
        }
      }
    }
  },
  {
    date: '2013-06-06',
    end: ['party']
  },
  {
    date: '2013-06-20',
    stampUpdates: [
      {
        categoryId: CategoryID.Activities,
        stamps: [
          {
            "stamp_id": 489,
            "name": "Puffle Dig",
            "is_member": 0,
            "rank": 1,
            "description": "Walk a puffle and find treasure",
            "rank_token": "easy"
          },
          {
            "stamp_id": 495,
            "name": "Tasty Treasure",
            "is_member": 1,
            "rank": 1,
            "description": "Find your puffle's favorite food in a treasure dig",
            "rank_token": "easy"
          },
          {
            "stamp_id": 490,
            "name": "First Dig",
            "is_member": 0,
            "rank": 2,
            "description": "See another player's puffle find their first treasure",
            "rank_token": "medium"
          },
          {
            "stamp_id": 491,
            "name": "Every Color",
            "is_member": 0,
            "rank": 2,
            "description": "Dig up treasure with 11 different color puffles",
            "rank_token": "medium"
          },
          {
            "stamp_id": 492,
            "name": "Dig All Day",
            "is_member": 0,
            "rank": 2,
            "description": "Find puffle treasure 5 times in a day",
            "rank_token": "medium"
          },
          {
            "stamp_id": 493,
            "name": "Big Dig",
            "is_member": 0,
            "rank": 3,
            "description": "Find over 50 coins in a puffle dig",
            "rank_token": "hard"
          },
          {
            "stamp_id": 494,
            "name": "Treasure Box",
            "is_member": 1,
            "rank": 3,
            "description": "Find an item in a puffle treasure dig",
            "rank_token": "hard"
          }
        ]
      }
    ]
  },
  {
    date: '2013-06-27',
    temp: {
      party: {
        partyName: 'Monsters University Takeover',
        rooms: {
          coffee: 'archives:RoomsCoffee-MUTakeover2013.swf',
          forts: 'archives:RoomsForts-MUTakeover2013.swf',
          party1: 'archives:MUTakeover2013-Party1.swf',
          party2: 'archives:MUTakeover2013-Party2.swf',
          party3: 'archives:MUTakeover2013-Party3.swf',
          party4: 'archives:MUTakeover2013-Party4.swf',
          party5: 'archives:MUTakeover2013-Party5.swf',
          party6: 'archives:MUTakeover2013-Party6.swf',
          party7: 'archives:MUTakeover2013-Party7.swf',
          party8: 'archives:MUTakeover2013-Party8.swf',
          pizza: 'archives:RoomsPizza-MUTakeover2013.swf',
          plaza: 'archives:RoomsPlaza-MUTakeover2013.swf',
          town: 'archives:RoomsTown-MUTakeover2013.swf'
        },
        music: {
          party3: 420,
          party1: 419,
          coffee: 429,
          party4: 423,
          party6: 427,
          party5: 425,
          pizza: 421,
          plaza: 419,
          party8: 424,
          party7: 426,
          party2: 422,
          forts: 419,
          town: 419
        },
        startscreens: [
          'archives:ENMonstersUniversityTakeoverLoginScreen1.swf',
          'archives:ENMonstersUniversityTakeoverLoginScreen2.swf',
          'archives:ENMonstersUniversityTakeoverLoginScreen3.swf'
        ],
        localChanges: {
          'catalogues/party.swf': {
            en: 'archives:ENMUTakeoverCatalog.swf'
          },
          'close_ups/member.swf': {
            en: 'archives:ENClose_upsMember-MUTakeover.swf'
          },
          'close_ups/party_map_note.swf': {
            en: 'archives:ENClose_upsMap-MUTakeover.swf'
          },
          'close_ups/login_prompt.swf': {
            en: 'archives:ENCloseUpsLoginPrompt-MUTakeover2013.swf'
          },
          'close_ups/frat_house_dialog.swf': {
            en: 'archives:ENCloseUpsFratHouseDialog.swf'
          }
        }
      }
    }
  },
  {
    date: '2013-07-11',
    end: ['party'],
    dateReference: 'school',
    rooms: {
      school: 'archives:RoomsSchool.swf',
      dojosnow: 'archives:RoomsDojosnow-July2013.swf'
    },
    temp: {
      const: {
        rooms: {
          beach: 'archives:StarWarsTakeoverConstruction-RoomsBeach.swf',
          dock: 'archives:StarWarsTakeoverConstruction-RoomsDock.swf',
          berg: 'archives:StarWarsTakeoverConstruction-RoomsBerg.swf',
          mtn: 'archives:StarWarsTakeoverConstruction-RoomsMtn.swf',
          village: 'archives:StarWarsTakeoverConstruction-RoomsVillage.swf',
          town: 'archives:RoomsTown-StarWarsTakeoverPre.swf'
        },
        music: {
          beach: 380,
          dock: 380,
          berg: 380,
          mtn: 381,
          village: 381,
          town: 383
        },
        globalChanges: {
          'telescope/telescope.swf': 'archives:StarWarsTakeover-TelescopeDeathstar.swf'
        },
        startscreens: [
          'archives:StarWarsTakeover-ENLoginScreen1.swf'
        ]
      }
    }
  },
  {
    date: '2013-07-18',
    // target background redesign
    fileChanges: {
      'play/v2/content/global/clothing/photos/906.swf': 'slegacy:media/play/v2/content/global/clothing/photos/906.swf',
      'play/v2/content/global/clothing/icons/906.swf': 'slegacy:media/play/v2/content/global/clothing/icons/906.swf'
    },
    temp: {
      const: {
        rooms: {
          beach: 'archives:StarWarsTakeoverConstruction2-RoomsBeach.swf',
          dock: 'archives:StarWarsTakeoverConstruction2-RoomsDock.swf',
          berg: 'archives:StarWarsTakeoverConstruction2-RoomsBerg.swf',
          mtn: 'archives:StarWarsTakeoverConstruction2-RoomsMtn.swf',
          village: 'archives:StarWarsTakeoverConstruction2-RoomsVillage.swf',
          town: 'archives:RoomsTown-StarWarsTakeoverPre2.swf'
        },
        globalChanges: {
          'telescope/telescope.swf': 'archives:StarWarsTakeover-TelescopeDeathstar2.swf'
        },
        startscreens: [
          'archives:StarWarsTakeover-ENLoginScreen2.swf'
        ]
      }
    }
  },
  {
    date: '2013-07-25',
    temp: {
      party: {
        partyName: 'Star Wars Takeover',
        rooms: {
          beach: 'archives:StarWarsTakeover-RoomsBeach.swf',
          dock: 'archives:StarWarsTakeover-RoomsDock.swf',
          berg: 'archives:StarWarsTakeover-RoomsBerg.swf',
          mtn: 'archives:StarWarsTakeover-RoomsMtn.swf',
          village: 'archives:StarWarsTakeover-RoomsVillage.swf',
          town: 'archives:RoomsTown-StarWarsTakeover.swf',
          party1: 'archives:StarWarsTakeover-RoomsParty1.swf',
          party2: 'archives:StarWarsTakeover-RoomsParty2.swf',
          party3: 'archives:StarWarsTakeover-RoomsParty3.swf',
          party4: 'archives:StarWarsTakeover-RoomsParty4.swf',
          party5: 'archives:StarWarsTakeover-RoomsParty5.swf',
          party6: 'archives:StarWarsTakeover-RoomsParty6.swf',
          party7: 'archives:StarWarsTakeover-RoomsParty7.swf'
        },
        music: {
          beach: 380,
          dock: 380,
          berg: 380,
          mtn: 381,
          village: 381,
          town: 383,
          party1: 453,
          party2: 445,
          party3: 447,
          party4: 444,
          party5: 446,
          party6: 445,
          party7: 438
        },
        startscreens: [
          'archives:StarWarsTakeover-ENLoginScreenCadence.swf',
          'archives:StarWarsTakeover-ENLoginScreenHerbert.swf'
        ],
        globalChanges: {
          'telescope/telescope.swf': 'archives:StarWarsTakeover-TelescopeDeathstar3.swf',
          'avatar/sprites/jedibrown.swf': [
            'archives:AvatarSpritesJedi_Brown.swf',
            'w.avatarsprite.starwars.jedibrown'
          ],
          'avatar/sprites/jediblack.swf': [
            'archives:AvatarSpritesJedi_Black.swf',
            'w.avatarsprite.starwars.jediblack'
          ],
          'avatar/sprites/vader.swf': [
            'archives:AvatarSpritesVader.swf',
            'w.avatarsprite.starwars.vader'
          ]
        },
        localChanges: {
          'catalogues/party.swf': {
            en: ['archives:ENCataloguesParty-StarWarsTakeover.swf', 'party_catalogue', 'w.party.clothing.catalogue1']
          },
          'close_ups/starwars_party_interface.swf': {
            en: ['archives:ENClose_upsTatooine_map.swf', 'w.p2013.starwars.partyinterface']
          },
          'close_ups/blaster_game_interface.swf': {
            en: ['archives:StarWarsTakeover-ENCloseUps-blaster_game_interface.swf', 'w.p2013.starwars.blastergameui']
          },
          'close_ups/icejam_interface.swf': {
            en: ['archives:StarWarsTakeover-ENCloseUps-icejam_interface.swf', 'w.p2013.starwars.icejamui']
          },
          'close_ups/xwing_game_interface.swf': {
            en: ['archives:StarWarsTakeover-ENCloseUps-xwing_game_interface.swf', 'w.p2013.starwars.xwinggameui']
          },
          'close_ups/tatooine_map.swf': {
            en: ['archives:ENClose_upsTatooine_map.swf', 'w.p2013.starwars.tatooinemap']
          },
          'close_ups/deathstar_map.swf': {
            en: ['archives:ENClose_upsDeathstar_map.swf', 'w.p2013.starwars.deathstarmap']
          },
          'close_ups/yavin_map.swf': {
            en: ['archives:ENClose_upsYavin_map.swf', 'w.p2013.starwars.yavinmap']
          },
          'close_ups/character_dialogue_soloroom.swf': {
            en: ['archives:ENClose_upsCharacter_dialogue_soloroom.swf', 'w.p2013.starwars.dialogue_soloroom']
          },
          'close_ups/character_dialogue_tatooine_welcome.swf': {
            en: ['archives:ENClose_upsCharacter_dialogue_tatooine_welcome.swf', 'w.p2013.starwars.dialogue_tatooine_1']
          },
          'close_ups/character_dialogue_tatooine_congratulations.swf': {
            en: ['archives:ENClose_upsCharacter_dialogue_tatooine_congratulations.swf', 'w.p2013.starwars.dialogue_tatooine_2']
          },
          'close_ups/character_dialogue_deathstar_welcome.swf': {
            en: ['archives:ENClose_upsCharacter_dialogue_deathstar_welcome.swf', 'w.p2013.starwars.dialogue_deathstar_1']
          },
          'close_ups/character_dialogue_deathstar_congratulations.swf': {
            en: ['archives:ENClose_upsCharacter_dialogue_deathstar_congratulations.swf', 'w.p2013.starwars.dialogue_deathstar_2']
          },
          'close_ups/character_dialogue_yavin_welcome.swf': {
            en: ['archives:ENClose_upsCharacter_dialogue_yavin_welcome.swf', 'w.p2013.starwars.dialogue_yavin_1']
          },
          'close_ups/character_dialogue_yavin_congratulations.swf': {
            en: ['archives:ENClose_upsCharacter_dialogue_yavin_congratulations.swf', 'w.p2013.starwars.dialogue_yavin_2']
          }
        }
      }
    }
  },
  {
    date: '2013-08-01',
    temp: {
      party: {
        update: 'The Death Star is now open',
        rooms: {
          party8: 'archives:StarWarsTakeover-RoomsParty8.swf',
          party9: 'archives:StarWarsTakeover-RoomsParty9.swf',
          party10: 'archives:StarWarsTakeover-RoomsParty10.swf',
          party11: 'archives:StarWarsTakeover-RoomsParty11.swf',
          party12: 'archives:StarWarsTakeover-RoomsParty12.swf',
          party13: 'archives:StarWarsTakeover-RoomsParty13.swf',
          party14: 'archives:StarWarsTakeover-RoomsParty14.swf',
          party15: 'archives:StarWarsTakeover-RoomsParty15.swf'
        },
        music: {
          party8: 451,
          party9: 441,
          party10: 440,
          party11: 439,
          party12: 439,
          party13: 452,
          party14: 442,
          party15: 450
        }
      }
    }
  },
  {
    date: '2013-08-08',
    temp: {
      party: {
        update: 'Yavin 4 is now open',
        rooms: {
          party16: 'archives:StarWarsTakeover-RoomsParty16.swf',
          party17: 'archives:StarWarsTakeover-RoomsParty17.swf'
        },
        music: {
          party16: 448,
          party17: 449
        }
      }
    }
  },
  {
    date: '2013-08-14',
    end: ['party'],
    martialArtworks: 'archives:ENCataloguesNinja-August2013.swf'
  },
  {
    date: '2013-08-22',
    temp: {
      party: {
        partyName: 'Teen Beach Movie Summer Jam',
        rooms: {
          beach: 'archives:RoomsBeach-TeenBeachMovieSummerJam.swf',
          cove: 'archives:RoomsCove-TeenBeachMovieSummerJam.swf',
          dock: 'archives:RoomsDock-TeenBeachMovieSummerJam.swf',
          forest: 'archives:RoomsForest-TeenBeachMovieSummerJam.swf',
          forts: 'archives:RoomsForts-TeenBeachMovieSummerJam.swf',
          party1: 'archives:RoomsParty1-TeenBeachMovieSummerJam.swf',
          party2: 'archives:RoomsParty2-TeenBeachMovieSummerJam.swf',
          party3: 'archives:RoomsParty3-TeenBeachMovieSummerJam.swf',
          party4: 'archives:RoomsParty4-TeenBeachMovieSummerJam.swf',
          plaza: 'archives:RoomsPlaza-TeenBeachMovieSummerJam.swf',
          rink: 'archives:RoomsRink-TeenBeachMovieSummerJam.swf',
          school: 'archives:RoomsSchool-TeenBeachMovieSummerJam.swf',
          town: 'archives:RoomsTown-TeenBeachMovieSummerJam.swf'
        },
        music: {
          town: 472,
          school: 436,
          plaza: 470,
          beach: 467,
          dock: 468,
          forts: 469,
          rink: 471,
          forest: 477,
          cove: 469,
          party1: 474,
          party2: 473,
          party3: 475,
          party4: 476
        },
        startscreens: [
          'archives:LoginScreen-ENTeenBeachTeaser1.swf',
          'archives:TeenBeach-ENLoginScreen1.swf',
          'archives:LoginScreen-ENTeen-beach-member.swf'
        ],
        localChanges: {
          'catalogues/party.swf': {
            en: 'archives:ENCataloguesParty-TBMSummerJam.swf'
          }
        }
      }
    }
  },
  {
    date: '2013-09-05',
    end: ['party']
  },
  {
    date: '2013-09-11',
    temp: {
      const: {
        rooms: {
          dock: 'archives:RoomsDock-MedievalParty2013Construction.swf',
          forest: 'archives:RoomsForest-MedievalParty2013Construction.swf',
          shack: 'archives:RoomsShack-MedievalParty2013Construction.swf',
          school: 'archives:RoomsSchool-MedievalParty2013Construction.swf',
          town: 'archives:RoomsTown-MedievalParty2013Construction.swf'
        },
        music: {
          dock: 380,
          forest: 382,
          shack: 383,
          school: 436,
          town: 383
        },
        startscreens: [
          'archives:LoginScreen-ENMedieval-preawareness.swf'
        ]
      }
    }
  },
  {
    date: '2013-09-12',
    roomComment: 'Sound is added to the Crow\'s Nest',
    rooms: {
      shipnest: 'archives:RoomsShipNest-Sept2013.swf'
    }
  },
  {
    date: '2013-09-18',
    temp: {
      party: {
        partyName: 'Medieval Party',
        rooms: {
          coffee: 'archives:RoomsCoffee-MedievalParty2013.swf',
          dance: 'archives:RoomsDance-MedievalParty2013.swf',
          dock: 'archives:RoomsDock-MedievalParty2013.swf',
          forest: 'archives:RoomsForest-MedievalParty2013.swf',
          forts: 'archives:RoomsForts-MedievalParty2013.swf',
          party1: 'archives:RoomsParty1-MedievalParty2013.swf',
          party2: 'archives:RoomsParty2-MedievalParty2013.swf',
          pizza: 'archives:RoomsPizza-MedievalParty2013.swf',
          plaza: 'archives:RoomsPlaza-MedievalParty2013.swf',
          rink: 'archives:RoomsRink-MedievalParty2013.swf',
          school: 'archives:RoomsSchool-MedievalParty2013.swf',
          shack: 'archives:RoomsShack-MedievalParty2013.swf',
          town: 'archives:RoomsTown-MedievalParty2013.swf'
        },
        music: {
          coffee: 480,
          party1: 484,
          dock: 481,
          forest: 482,
          shack: 489,
          dance: 493,
          pizza: 485,
          plaza: 486,
          school: 436,
          forts: 483,
          rink: 487,
          town: 490,
          party2: 494
        },
        startscreens: [
          'archives:LoginScreen-ENMedieval-onnow-1.swf',
          'archives:LoginScreen-ENMedieval-onnow-2.swf'
        ],
        localChanges: {
          'catalogues/party.swf': {
            en: 'archives:ENCataloguesParty-MedievalParty2013.swf'
          },
          'close_ups/quest_book.swf': {
            en: 'archives:ENClose_upsQuest_book-MedievalParty2013.swf'
          },
          'close_ups/character_dialogue_soloroom.swf': {
            en: 'archives:Close_upsCharacter_dialogue_soloroom-MedievalParty2013.swf'
          },
          'close_ups/character_dialogue_reminder.swf': {
            en: 'archives:Close_upsCharacter_dialogue_reminder-MedievalParty2013.swf'
          },
          'close_ups/character_dialogue_final_ingredient.swf': {
            en: 'archives:Close_upsCharacter_dialogue_final_ingredient-MedievalParty2013.swf'
          },
          'close_ups/character_dialogue_game_success.swf': {
            en: 'archives:Close_upsCharacter_dialogue_game_success-MedievalParty2013.swf'
          },
          'close_ups/character_dialogue_game_fail.swf': {
            en: 'archives:Close_upsCharacter_dialogue_game_fail-MedievalParty2013.swf'
          }
        },
        mapNote: 'archives:ENClose_upsParty_map_note-MedievalParty2013.swf',
        partyIconFile: 'archives:ContentParty_icon-MedievalParty2013.swf'
      }
    }
  },
  {
    date: '2013-10-03',
    end: ['party']
  },
  {
    date: '2013-10-10',
    temp: {
      const: {
        rooms: {
          beach: 'archives:RoomsBeach-HalloweenParty2013Construction.swf',
          cove: 'archives:RoomsCove-HalloweenParty2013Construction.swf',
          dock: 'archives:RoomsDock-HalloweenParty2013Construction.swf',
          forest: 'archives:RoomsForest-HalloweenParty2013Construction.swf',
          school: 'archives:RoomsSchool-HalloweenParty2013Construction.swf'
        },
        music: {
          forest: 382,
          school: 436
        },
        startscreens: [
          'archives:LoginScreen-ENHalloween-preawareness.swf'
        ]
      }
    }
  },
  {
    date: '2013-10-16',
    temp: {
      party: {
        partyName: 'Halloween Party',
        rooms: {
          attic: 'archives:RoomsAttic-HalloweenParty2013.swf',
          beach: 'archives:RoomsBeach-HalloweenParty2013.swf',
          beacon: 'archives:RoomsBeacon-HalloweenParty2013.swf',
          berg: 'archives:RoomsBerg-HalloweenParty2013.swf',
          book: 'archives:RoomsBook-HalloweenParty2013.swf',
          cave: 'archives:RoomsCave-HalloweenParty2013.swf',
          coffee: 'archives:RoomsCoffee-HalloweenParty2013.swf',
          cove: 'archives:RoomsCove-HalloweenParty2013.swf',
          dance: 'archives:RoomsDance-HalloweenParty2013.swf',
          dock: 'archives:RoomsDock-HalloweenParty2013.swf',
          dojo: 'archives:RoomsDojo-HalloweenParty2013.swf',
          dojoext: 'archives:RoomsDojoext-HalloweenParty2013.swf',
          forest: 'archives:RoomsForest-HalloweenParty2013.swf',
          forts: 'archives:RoomsForts-HalloweenParty2013.swf',
          hotellobby: 'archives:RoomsHotellobby-HalloweenParty2013.swf',
          hotelroof: 'archives:RoomsHotelroof-HalloweenParty2013.swf',
          hotelspa: 'archives:RoomsHotelspa-HalloweenParty2013.swf',
          light: 'archives:RoomsLight-HalloweenParty2013.swf',
          lodge: 'archives:RoomsLodge-HalloweenParty2013.swf',
          mtn: 'archives:RoomsMtn-HalloweenParty2013.swf',
          pet: 'archives:RoomsPet-HalloweenParty2013.swf',
          pizza: 'archives:RoomsPizza-HalloweenParty2013.swf',
          plaza: 'archives:RoomsPlaza-HalloweenParty2013.swf',
          rink: 'archives:RoomsRink-HalloweenParty2013.swf',
          school: 'archives:RoomsSchool-HalloweenParty2013.swf',
          shack: 'archives:RoomsShack-HalloweenParty2013.swf',
          shop: 'archives:RoomsShop-HalloweenParty2013.swf',
          town: 'archives:RoomsTown-HalloweenParty2013.swf',
          village: 'archives:RoomsVillage-HalloweenParty2013.swf'
        },
        music: {
          beach: 495,
          beacon: 504,
          cove: 496,
          dance: 497,
          dock: 498,
          dojo: 403,
          dojoext: 404,
          forest: 499,
          hotellobby: 362,
          hotelroof: 360,
          hotelspa: 361,
          shack: 503,
          village: 381,
          forts: 500,
          town: 512
        },
        startscreens: [
          'archives:LoginScreen-ENHalloween-member-1.swf',
          'archives:LoginScreen-ENHalloween-member-2.swf'
        ],
        localChanges: {
          'close_ups/pumpkingame.swf': {
            en: 'archives:ENClose_upsPumpkingame.swf'
          },
          'close_ups/character_dialogue_login.swf': {
            en: 'archives:Close_upsCharacter_dialogue_login-HalloweenParty2013.swf'
          },
          'close_ups/character_dialogue_specialcandy.swf': {
            en: 'archives:Close_upsCharacter_dialogue_specialcandy-HalloweenParty2013.swf'
          },
          'close_ups/character_dialogue_transformcandy.swf': {
            en: 'archives:Close_upsCharacter_dialogue_transformcandy-HalloweenParty2013.swf'
          }
        },
        globalChanges: {
          'avatar/sprites/vampirea.swf': 'archives:AvatarSpritesVampireA-HalloweenParty2013.swf',
          'avatar/sprites/vampireb.swf': 'archives:AvatarSpritesVampireB-HalloweenParty2013.swf',
          'avatar/sprites/vampirec.swf': 'archives:AvatarSpritesVampireC-HalloweenParty2013.swf',
          'avatar/sprites/werewolfa.swf': 'archives:AvatarSpritesWerewolfA-HalloweenParty2013.swf',
          'avatar/sprites/werewolfb.swf': 'archives:AvatarSpritesWerewolfB-HalloweenParty2013.swf',
          'avatar/sprites/werewolfc.swf': 'archives:AvatarSpritesWerewolfC-HalloweenParty2013.swf',
          'avatar/sprites/zombiea.swf': 'archives:AvatarSpritesZombieA-HalloweenParty2013.swf',
          'avatar/sprites/zombieb.swf': 'archives:AvatarSpritesZombieB-HalloweenParty2013.swf',
          'avatar/sprites/zombiec.swf': 'archives:AvatarSpritesZombieC-HalloweenParty2013.swf'
        }
      }
    }
  },
  {
    date: '2013-10-24',
    temp: {
      party2: {
        partyName: '8th Anniversary Party',
        update: 'The 8th Anniversary Party begins',
        partyIcon: 'party',
        rooms: {
          coffee: 'archives:RoomsCoffee-8thAnniversaryParty.swf',
          town: 'archives:RoomsTown-8thAnniversaryParty.swf'
        },
        music: {
          coffee: 1,
          town: 512
        },
        startscreens: [
          'archives:LoginScreen-EN8thAnniversaryParty.swf'
        ]
      }
    }
  },
  {
    date: '2013-10-25',
    end: ['party2']
  },
  {
    date: '2013-11-01',
    end: ['party']
  },
  {
    date: '2013-11-06',
    temp: {
      const: {
        rooms: {
          boiler: 'archives:RoomsBoiler-OperationPuffleConstruction.swf',
          lake: 'archives:RoomsLake-OperationPuffleConstruction.swf',
          mine: 'archives:RoomsMine-OperationPuffleConstruction.swf'
        },
        music: {
          boiler: 6
        }
      }
    }
  },
  {
    date: '2013-11-13',
    temp: {
      const: {
        rooms: {
          boxdimension: 'archives:RoomsBoxdimension-OperationPuffleConstruction.swf',
          cavemine: 'archives:RoomsCavemine-OperationPuffleConstruction.swf',
          shack: 'archives:RoomsShack-OperationPuffleConstruction.swf',
          dance: 'archives:RoomsDance-OperationPuffleConstruction.swf',
          stage: 'archives:RoomsStage-OperationPuffleConstruction.swf'
        },
        music: {
          dance: 5
        }
      }
    }
  },
  {
    date: '2013-11-20',
    temp: {
      party: {
        partyName: 'Operation: Puffle',
        rooms: {
          agentlobbymulti: 'archives:OperationPuffleRoomsAgentlobbymulti.swf',
          attic: 'archives:OperationPuffleRoomsAttic.swf',
          beach: 'archives:OperationPuffleRoomsBeach.swf',
          beacon: 'archives:OperationPuffleRoomsBeacon.swf',
          berg: 'archives:OperationPuffleRoomsBerg.swf',
          book: 'archives:OperationPuffleRoomsBook.swf',
          coffee: 'archives:OperationPuffleRoomsCoffee.swf',
          cove: 'archives:OperationPuffleRoomsCove.swf',
          dock: 'archives:OperationPuffleRoomsDock.swf',
          dojofire: 'archives:RoomsDojofire-OperationPuffle.swf',
          dojosnow: 'archives:RoomsDojosnow-OperationPuffle.swf',
          forest: 'archives:OperationPuffleRoomsForest.swf',
          forts: 'archives:OperationPuffleRoomsForts.swf',
          hotellobby: 'archives:OperationPuffleRoomsHotelLobby.swf',
          hotelroof: 'archives:OperationPuffleRoomsHotelRoof.swf',
          hotelspa: 'archives:OperationPuffleRoomsHotelSpa.swf',
          light: 'archives:OperationPuffleRoomsLight.swf',
          lodge: 'archives:OperationPuffleRoomsLodge.swf',
          mtn: 'archives:OperationPuffleRoomsMtn.swf',
          party1: 'archives:OperationPuffleRoomsParty1.swf',
          party2: 'archives:OperationPuffleRoomsParty2.swf',
          party3: 'archives:OperationPuffleRoomsParty3.swf',
          party4: 'archives:OperationPuffleRoomsParty4.swf',
          party5: 'archives:OperationPuffleRoomsParty5.swf',
          party6: 'archives:OperationPuffleRoomsParty6.swf',
          party7: 'archives:OperationPuffleRoomsParty7.swf',
          party8: 'archives:OperationPuffleRoomsParty8.swf',
          party9: 'archives:OperationPuffleRoomsParty9.swf',
          party10: 'archives:OperationPuffleRoomsParty10.swf',
          pet: 'archives:OperationPuffleRoomsPet.swf',
          pizza: 'archives:OperationPuffleRoomsPizza.swf',
          plaza: 'archives:OperationPuffleRoomsPlaza.swf',
          rink: 'archives:OperationPuffleRoomsRink.swf',
          school: 'archives:RoomsSchool-OperationPuffle.swf',
          shack: 'archives:OperationPuffleRoomsShack.swf',
          shop: 'archives:OperationPuffleRoomsShop.swf',
          town: 'archives:OperationPuffleRoomsTown.swf',
          village: 'archives:OperationPuffleRoomsVillage.swf'
        },
        music: {
          dojofire: 405,
          forest: 379,
          shack: 437,
          hotellobby: 362,
          hotelspa: 361,
          dojosnow: 407,
          forts: 382,
          school: 436,
          party1: 522,
          party2: 523,
          party3: 524,
          party4: 525,
          party5: 526,
          party6: 527,
          party7: 528,
          party8: 529,
          party9: 530,
          party10: 531
        },
        startscreens: [
          'archives:LoginScreen-ENEpf-puffle-onnow.swf'
        ],
        localChanges: {
          'catalogues/party.swf': {
            en: 'archives:ENOperationPuffleCatalog.swf'
          },
          'close_ups/chips_matching_game.swf': {
            en: 'archives:ENCloseUpsChipsMatchingGame-OperationPuffle.swf'
          },
          'close_ups/quest_interface.swf': {
            en: 'archives:OperationPuffleCloseUpsQuestInterface.swf'
          },
          'close_ups/pregame_interface.swf': {
            en: 'archives:OperationPuffleCloseUpsPreGameInterface.swf'
          },
          'close_ups/postgame_interface.swf': {
            en: 'archives:OperationPuffleCloseUpsPostGameInterface.swf'
          },
          'close_ups/character_dialogue_gary_chipscollected.swf': {
            en: 'archives:Close_upsCharacter_dialogue_gary_chipscollected-OperationPuffle.swf'
          },
          'close_ups/character_dialogue_herbert_1.swf': {
            en: 'archives:Close_upsCharacter_dialogue_herbert_1-OperationPuffle.swf'
          },
          'close_ups/character_dialogue_herbert_2.swf': {
            en: 'archives:Close_upsCharacter_dialogue_herbert_2-OperationPuffle.swf'
          },
          'close_ups/character_dialogue_herbert_3.swf': {
            en: 'archives:Close_upsCharacter_dialogue_herbert_3-OperationPuffle.swf'
          },
          'close_ups/character_dialogue_herbert_4.swf': {
            en: 'archives:Close_upsCharacter_dialogue_herbert_4-OperationPuffle.swf'
          },
          'close_ups/character_dialogue_herbert_5.swf': {
            en: 'archives:Close_upsCharacter_dialogue_herbert_5-OperationPuffle.swf'
          },
          'membership/party1.swf': {
            en: 'archives:ENMembershipParty1.swf'
          }
        },
        globalChanges: {
          'rooms/effects/avatar.swf': 'archives:OperationPuffleRoomsEffectsAvatar.swf',
          'telescope/telescope.swf': 'archives:OperationPuffleGlobalTelescopeEpfnightsky.swf',
          'binoculars/empty.swf': 'archives:OperationPuffleGlobalBinocularsEpfnightsky.swf'
        },
        fileChanges: {
          'play/v2/games/chase/chase.swf': 'archives:GamesChaseChase.swf',
          'play/v2/games/chase/lang/en/locale.swf': 'archives:GamesChaseLangEnLocale.swf'
        }
      }
    }
  },
  {
    date: '2013-12-05',
    end: ['party']
  },
  {
    date: '2013-12-12',
    petFurniture: 'archives:ENCataloguesPetsDec2013.swf'
  },
  {
    date: '2013-12-18',
    temp: {
      party: {
        partyName: 'Holiday Party',
        rooms: {
          agentlobbymulti: 'archives:RoomsAgentlobbymulti-HolidayParty2013.swf',
          attic: 'archives:RoomsAttic-HolidayParty2013.swf',
          beach: 'archives:RoomsBeach-HolidayParty2013.swf',
          beacon: 'archives:RoomsBeacon-HolidayParty2013.swf',
          berg: 'archives:RoomsBerg-HolidayParty2013.swf',
          book: 'archives:RoomsBook-HolidayParty2013.swf',
          cloudforest: 'archives:RoomsCloudForest-HolidayParty2013.swf',
          coffee: 'archives:RoomsCoffee-HolidayParty2013.swf',
          cove: 'archives:RoomsCove-HolidayParty2013.swf',
          dock: 'archives:RoomsDock-HolidayParty2013.swf',
          dojofire: 'archives:RoomsDojofire-HolidayParty2013.swf',
          dojosnow: 'archives:RoomsDojosnow-HolidayParty2013.swf',
          forest: 'archives:RoomsForest-HolidayParty2013.swf',
          forts: 'archives:RoomsForts-HolidayParty2013.swf',
          hotellobby: 'archives:RoomsHotellobby-HolidayParty2013.swf',
          hotelroof: 'archives:RoomsHotelroof-HolidayParty2013.swf',
          hotelspa: 'archives:RoomsHotelspa-HolidayParty2013.swf',
          light: 'archives:RoomsLight-HolidayParty2013.swf',
          lodge: 'archives:RoomsLodge-HolidayParty2013.swf',
          mtn: 'archives:RoomsMtn-HolidayParty2013.swf',
          party1: 'archives:RoomsParty1-HolidayParty2013.swf',
          party2: 'archives:RoomsParty2-HolidayParty2013.swf',
          party3: 'archives:RoomsParty3-HolidayParty2013.swf',
          party4: 'archives:RoomsParty4-HolidayParty2013.swf',
          pet: 'archives:RoomsPet-HolidayParty2013.swf',
          pizza: 'archives:RoomsPizza-HolidayParty2013.swf',
          plaza: 'archives:RoomsPlaza-HolidayParty2013.swf',
          rink: 'archives:RoomsRink-HolidayParty2013.swf',
          school: 'archives:RoomsSchool-HolidayParty2013.swf',
          shack: 'archives:RoomsShack-HolidayParty2013.swf',
          shop: 'archives:RoomsShop-HolidayParty2013.swf',
          town: 'archives:RoomsTown-HolidayParty2013.swf',
          village: 'archives:RoomsVillage-HolidayParty2013.swf'
        },
        music: {
          dock: 545,
          shack: 556,
          pizza: 552,
          forts: 556,
          town: 556,
          school: 552,
          party1: 315,
          party2: 557,
          party3: 557,
          party4: 557
        },
        startscreens: [
          'archives:LoginScreen-ENCfc.swf',
          'archives:LoginScreen-ENCfc-gift.swf'
        ],
        localChanges: {
          'catalogues/party.swf': {
            en: 'archives:ENCataloguesParty-HolidayParty2013.swf'
          },
          'close_ups/party_interface.swf': {
            en: 'archives:ENClose_upsParty_interface-HolidayParty2013.swf'
          },
          'close_ups/train_catalogue.swf': {
            en: 'archives:ENClose_upsTrain_catalogue-HolidayParty2013.swf'
          },
          'close_ups/donation_ui.swf': {
            en: 'archives:ENClose_upsDonation_ui-HolidayParty2013.swf'
          },
          'close_ups/trainstation_igloo_list.swf': {
            en: 'archives:ENClose_upsTrainstation_igloo_list-HolidayParty2013.swf'
          }
        },
        coinsForChange: true
      }
    }
  },
];

export const UPDATES_2013: Update[] = mergeIssueUpdates(
  BASE_UPDATES_2013,
  NEWSPAPER_ISSUES_2013
);