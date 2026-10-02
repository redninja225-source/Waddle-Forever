import { Update } from ".";

export const UPDATES_2014_PARTIES: Update[] = [
  {
    date: '2014-01-16',
    temp: {
      const: {
        fileChanges: {
          'play/v2/client/party.swf': 'recreation:party_scripts/prehistoric_construction_2014.swf'
        },
        rooms: {
          forts: 'archives:Prehistoric2014ConstForts_3.swf',
          party1: 'archives:PrehistoricPartyConstParty1.swf'
        }
      }
    }
  },
  {
    date: '2014-01-23',
    temp: {
      party: {
        partyName: 'Prehistoric Party 2014',
        fileChanges: {
          'play/v2/client/party.swf': 'recreation:party_scripts/prehistoric_2014.swf'
        },
        partyIcon: 'party',
        rooms: {
          party6: 'archives:Prehistoric2014Party6.swf',
          party10: 'archives:Prehistoric2014Party10.swf',
          party11: 'archives:Prehistoric2014Party11.swf',
          party14: 'archives:Prehistoric2014Party14.swf',
          party13: 'archives:Prehistoric2014Party13.swf',
          forts: 'archives:Prehistoric2014Forts.swf',
          party12: 'archives:Prehistoric2014Party12.swf',
          party3: 'archives:Prehistoric2014Party3.swf',
          party1: 'archives:Prehistoric2014Party1.swf',
          party2: 'archives:Prehistoric2014Party2.swf',
          party8: 'archives:Prehistoric2014Party8.swf',
          party9: 'archives:Prehistoric2014Party9.swf',
          party15: 'archives:Prehistoric2014Party15.swf',
          party16: 'archives:Prehistoric2014Party16.swf',
          party17: 'archives:Prehistoric2014Party17.swf',
          party5: 'archives:Prehistoric2014Party5.swf',
          party7: 'archives:Prehistoric2014Party7.swf',
          party4: 'archives:Prehistoric2014Party4.swf'
        },
        music: {
          party6: 566,
          party10: 578,
          party11: 571,
          party14: 568,
          party13: 567,
          party12: 577,
          party3: 564,
          party1: 575,
          party2: 569,
          party8: 576,
          party9: 573,
          party15: 566,
          party16: 574,
          party17: 574,
          party5: 565,
          party7: 570,
          party4: 568
        },
        map: 'archives:PrehistoricParty2014Map.swf',
        mapNote: 'archives:Prehistoric2014ENMapNotice.swf',
        startscreens: [ 'archives:LoginScreen-ENCPrehistoricPreAwareness.swf' ],
        localChanges: {
          'close_ups/quest_interface.swf': { en: 'archives:ENCloseUpsQuestInterface-PrehistoricParty2014.swf' },
          'close_ups/dinopuffleinstructions.swf': { en: 'archives:ENCloseUpsDinoPuffleInstructions-PrehistoricParty2014.swf' }
        }
      }
    }
  },
  { date: '2014-02-05', end: [ 'party' ] },
  {
    date: '2014-02-20',
    temp: {
      party: {
        partyName: 'The Fair 2014',
        partyIcon: 'party',
        rooms: {
          lounge: 'archives:TheFair2014PreLounge.swf',
          beach: 'archives:TheFair2014Beach.swf',
          beacon: 'archives:TheFair2014Beacon.swf',
          book: 'archives:TheFair2014Book.swf',
          shop: 'archives:TheFair2014Shop.swf',
          cloudforest: 'archives:TheFair2014CloudForest.swf',
          coffee: 'archives:TheFair2014Coffee.swf',
          cove: 'archives:TheFair2014Cove.swf',
          dock: 'archives:TheFair2014Dock.swf',
          dojo: 'archives:TheFair2014Dojo.swf',
          dojoext: 'archives:TheFair2014DojoCourtyard.swf',
          agent: 'archives:TheFair2014EverydayPhoningFacility.swf',
          dojofire: 'archives:TheFair2014DojoFire.swf',
          forest: 'archives:TheFair2014Forest.swf',
          berg: 'archives:TheFair2014Iceberg.swf',
          light: 'archives:TheFair2014Light.swf',
          attic: 'archives:UltimateJamAttic.swf',
          shack: 'archives:TheFair2014Shack.swf',
          pet: 'archives:TheFair2014Pet.swf',
          pizza: 'archives:TheFair2014Pizza.swf',
          plaza: 'archives:TheFair2014Plaza.swf',
          hotellobby: 'archives:TheFair2014HotelLobby.swf',
          hotelroof: 'archives:TheFair2014Roof.swf',
          rink: 'archives:TheFair2014Rink.swf',
          mtn: 'archives:TheFair2014SkiHill.swf',
          lodge: 'archives:TheFair2014Lodge.swf',
          village: 'archives:TheFair2014Village.swf',
          dojosnow: 'archives:TheFair2014DojoSnow.swf',
          forts: 'archives:TheFair2014Forts.swf',
          town: 'archives:RoomsTown-TheFair2014.swf',
          party10: 'archives:TheFair2014Party10.swf',
          party7: 'archives:TheFair2014Party7.swf',
          party6: 'archives:TheFair2014Party6.swf',
          party2: 'archives:TheFair2014Party2.swf',
          party9: 'archives:TheFair2014Party9.swf',
          party1: 'archives:TheFair2014Party1.swf',
          party4: 'archives:TheFair2014Party4.swf',
          party3: 'archives:TheFair2014Party3.swf',
          party5: 'archives:TheFair2014Party5.swf',
          party8: 'archives:TheFair2014Party8.swf'
        },
        music: {
          lounge: 6,
          dock: 611,
          party10: 610,
          party7: 607,
          party6: 606,
          party2: 602,
          party9: 609,
          party1: 601,
          party4: 604,
          party3: 603,
          party5: 605,
          party8: 608
        },
        map: 'archives:TheFair2014PartyMapEN.swf',
        startscreens: [ 'archives:LoginScreen-ENFairPreAwareness.swf' ],
        localChanges: { 'catalogues/prizebooth.swf': { en: 'archives:TheFair2014PrizeBoothEN.swf' } },
        fileChanges: {
          'play/v2/client/party.swf': 'recreation:party_scripts/fair_2014.swf',
          'play/v2/content/global/rooms/effects/pixelpenguin.swf': 'archives:RoomsEffectsPixelpenguin-TheFair2014.swf'
        }
      }
    }
  },
  {
    date: '2014-03-05',
    temp: {
      party2: {
        partyName: 'Welcome Russia',
        partyIcon: 'party',
        rooms: { rink: 'archives:WelcomeRussiaStadium.swf' },
        music: { rink: 592 },
        fileChanges: {
          'play/v2/content/global/rooms/welcomesolo.swf': 'svanilla:media/play/v2/content/global/rooms/welcomesolo.swf'
        }
      }
    }
  },
  { date: '2014-03-06', end: [ 'party' ] },
  { date: '2014-03-12', end: [ 'party2' ] },
  {
    date: '2014-03-20',
    rooms: {
      dojo: 'archives:RoomsDojo_6.swf'
    },
    temp: {
      party: {
        partyName: 'Muppets World Tour',
        fileChanges: {
          'play/v2/client/party.swf': 'recreation:party_scripts/muppets_2014.swf'
        },
        partyIcon: 'party',
        rooms: {
          party1: 'archives:MuppetsWorldTourParty1.swf',
          beach: 'archives:MuppetsWorldTourBeach.swf',
          shop: 'archives:MuppetsWorldTourShop.swf',
          cove: 'archives:MuppetsWorldTourCove.swf',
          dock: 'archives:MuppetsWorldTourDock.swf',
          forest: 'archives:MuppetsWorldTourForest.swf',
          plaza: 'archives:MuppetsWorldTourPlaza.swf',
          village: 'archives:MuppetsWorldTourVillage.swf',
          forts: 'archives:MuppetsWorldTourForts.swf',
          rink: 'archives:MuppetsWorldTourStadium.swf',
          stage: 'archives:MuppetsWorldTourStage.swf',
          town: 'archives:RoomsTown-MuppetsWorldTour.swf'
        },
        music: {
          party1: 638,
          beach: 628,
          shop: 635,
          cove: 627,
          dock: 631,
          forest: 629,
          plaza: 637,
          village: 632,
          forts: 640,
          rink: 630,
          stage: 639,
          town: 636
        },
        startscreens: [
          'archives:LoginScreen-ENMuppetsWorldTourPreAwareness.swf',
          'archives:LoginScreen-ENMuppetsWorldTour-JoinTheTour.swf',
          'archives:LoginScreen-ENMuppetsWorldTour-member.swf'
        ],
        globalChanges: {
          'content/party_icon.swf': 'archives:ContentParty_icon-MuppetsWorldTour.swf',
          'close_ups/character_dialogue_constantine_museum.swf': 'archives:Close_upsCharacter_dialogue_constantine_museum-MuppetsWorldTour.swf',
          'close_ups/character_dialogue_instruction.swf': 'archives:Close_upsCharacter_dialogue_instruction-MuppetsWorldTour.swf',
          'close_ups/character_dialogue_kermit_finale.swf': 'archives:Close_upsCharacter_dialogue_kermit_finale-MuppetsWorldTour.swf',
          'close_ups/character_dialogue_login.swf': 'archives:Close_upsCharacter_dialogue_login-MuppetsWorldTour.swf',
          'close_ups/character_dialogue_rewards.swf': 'archives:Close_upsCharacter_dialogue_rewards-MuppetsWorldTour.swf',
          'close_ups/igloo_prompt.swf': 'archives:CloseUpsENIglooPrompt-MuppetsWorldTour.swf',
          'close_ups/party_igloo_list.swf': 'archives:CloseUpsENPartyIglooList-MuppetsWorldTour.swf'
        }
      }
    }
  },
  { date: '2014-04-01', end: [ 'party' ] },
  {
    date: '2014-04-17',
    petFurniture: 'archives:ENCataloguesPetsApr2014.swf',
    temp: {
      party: {
        partyName: 'Puffle Party 2014',
        fileChanges: {
          'play/v2/client/party.swf': 'recreation:party_scripts/puffle_2014.swf'
        },
        partyIcon: 'party',
        rooms: {
          beach: 'archives:RoomsBeach-PuffleParty2014.swf',
          shop: 'archives:RoomsShop-PuffleParty2014.swf',
          coffee: 'archives:RoomsCoffee-PuffleParty2014.swf',
          cove: 'archives:RoomsCove-PuffleParty2014.swf',
          dock: 'archives:RoomsDock-PuffleParty2014.swf',
          forest: 'archives:RoomsForest-PuffleParty2014.swf',
          light: 'archives:RoomsLight-PuffleParty2014.swf',
          pet: 'archives:RoomsPet-PuffleParty2014.swf',
          plaza: 'archives:RoomsPlaza-PuffleParty2014.swf',
          park: 'archives:RoomsPark.swf',
          forts: 'archives:RoomsForts-PuffleParty2014.swf',
          rink: 'archives:RoomsRink-PuffleParty2014.swf',
          stage: 'archives:RoomsStage-PuffleParty2014.swf',
          town: 'archives:RoomsTown-PuffleParty2014.swf'
        },
        music: {
          beach: 651,
          shop: 662,
          coffee: 652,
          cove: 653,
          dock: 654,
          forest: 655,
          light: 657,
          pet: 660,
          plaza: 659,
          park: 658,
          forts: 656,
          rink: 661,
          stage: 663,
          town: 659
        },
        map: 'archives:PuffleParty2014Map.swf',
        mapNote: 'archives:PuffleParty2014MapNoteEN.swf',
        startscreens: [ 'archives:LoginScreen-ENPuffleParty2014PreAwareness.swf' ]
      }
    }
  },
  {
    date: '2014-04-30',
    temp: {
      party2: {
        partyName: 'Funny Hat Week',
        partyIcon: 'party',
        rooms: { dock: 'archives:FunnyHatWeek.swf' },
        music: { dock: 668 }
      }
    }
  },
  { date: '2014-05-01', end: [ 'party' ] },
  { date: '2014-05-08', end: [ 'party2' ] },
  {
    date: '2014-05-15',
    temp: {
      const: { rooms: { forts: 'archives:RoomsForts-FuturePartyConstruction.swf' } }
    }
  },
  {
    date: '2014-05-22',
    temp: {
      party: {
        partyName: 'Future Party',
        fileChanges: {
          'play/v2/client/party.swf': 'recreation:party_scripts/future_2014.swf'
        },
        partyIcon: 'party',
        rooms: {
          party7: 'archives:RoomsParty7-FutureParty.swf',
          party3: 'archives:RoomsParty3-FutureParty.swf',
          party4: 'archives:RoomsParty4-FutureParty.swf',
          party1: 'archives:RoomsParty1-FutureParty.swf',
          party2: 'archives:RoomsParty2-FutureParty.swf',
          party6: 'archives:RoomsParty6-FutureParty.swf',
          party5: 'archives:RoomsParty5-FutureParty.swf',
          forts: 'archives:RoomsForts-FutureParty.swf',
          party9: 'archives:RoomsParty9-FutureParty.swf',
          party10: 'archives:RoomsParty10_protobot.swf',
          party8: 'archives:RoomsParty8-FutureParty.swf',
          party11: 'archives:RoomsParty11-FutureParty.swf'
        },
        music: {
          party7: 692,
          party3: 688,
          party4: 689,
          party1: 686,
          party2: 687,
          party6: 691,
          party5: 690,
          forts: 685,
          party9: 694,
          party10: 697,
          party8: 693,
          party11: 696
        },
        mapNote: 'archives:ENClose_upsParty_map_note-FutureParty.swf',
        startscreens: [ 'archives:LoginScreen-ENFuturePartyPreAwareness.swf' ],
        localChanges: {
          'close_ups/quest_interface.swf': { en: 'archives:ENClose_upsQuest_interface-FutureParty.swf' },
          'close_ups/party_map.swf': { en: 'archives:ENClose_upsParty_map-FutureParty.swf' },
          'close_ups/robo_customize.swf': { en: 'archives:ENClose_upsRobo_customize.swf' },
          'close_ups/party_igloo_list.swf': { en: 'archives:ENClose_upsParty_igloo_list-FutureParty.swf' },
          'close_ups/blastoff_error.swf': { en: 'archives:ENClose_upsBlastoff_error.swf' },
          'close_ups/protobot_rewards.swf': { en: 'archives:ENClose_upsProtobot_rewards.swf' }
        },
        globalChanges: {
          'membership/party1.swf': 'archives:MembershipParty1-FutureParty.swf',
          'membership/party2.swf': 'archives:MembershipParty2-FutureParty.swf',
          'close_ups/character_dialogue_login.swf': 'archives:Close_upsCharacter_dialogue_login-FutureParty.swf',
          'close_ups/character_dialogue_protobot_login.swf': 'archives:Close_upsCharacter_dialogue_protobot_login.swf',
          'close_ups/character_dialogue_robot.swf': 'archives:Close_upsCharacter_dialogue_robot.swf',
          'close_ups/character_dialogue_protobot.swf': 'archives:Close_upsCharacter_dialogue_protobot.swf'
        }
      }
    }
  },
  { date: '2014-06-05', end: [ 'party' ] },
  {
    date: '2014-06-12',
    temp: {
      party: {
        partyName: 'Penguin Prom',
        partyIcon: 'party',
        rooms: {
          shack: 'archives:RoomsShack-PenguinProm.swf',
          school: 'archives:RoomsSchool-PenguinProm.swf'
        },
        music: { shack: 706, school: 705 }
      },
      const: {
        rooms: {
          forts: 'archives:RoomsForts-PenguinCupConstruction.swf',
          rink: 'archives:RoomsStadium-PenguinCupConstruction.swf'
        }
      }
    }
  },
  {
    date: '2014-06-19',
    end: [ 'party' ],
    temp: {
      party2: {
        partyName: 'Penguin Cup',
        partyIcon: 'party',
        rooms: {
          beach: 'archives:RoomsBeach-PenguinCup.swf',
          cove: 'archives:RoomsCove-PenguinCup.swf',
          dock: 'archives:RoomsDock-PenguinCup.swf',
          forest: 'archives:RoomsForest-PenguinCup.swf',
          plaza: 'archives:RoomsPlaza-PenguinCup.swf',
          forts: 'archives:RoomsForts-PenguinCup.swf',
          rink: 'archives:RoomsRink-PenguinCup.swf',
          stage: 'archives:RoomsStage-PenguinCup.swf',
          town: 'archives:RoomsTown-PenguinCup.swf'
        },
        music: {
          beach: 708,
          cove: 709,
          dock: 710,
          forest: 711,
          plaza: 715,
          forts: 712,
          rink: 707,
          stage: 714,
          town: 715
        },
        map: 'archives:ContentMap-PenguinCup.swf',
        mapNote: 'archives:ENClose_upsParty_map_note-PenguinCup.swf',
        startscreens: [ 'archives:LoginScreen-ENPenguinCup1.swf' ],
        localChanges: {
          'close_ups/quest_interface.swf': { en: 'archives:ENClose_upsQuest_interface-PenguinCup.swf' },
          'close_ups/party_map.swf': { en: 'archives:ENClose_upsParty_map_note-PenguinCup.swf' },
          'close_ups/party_igloo_list.swf': { en: 'archives:ENClose_upsParty_igloo_list-PenguinCup.swf' }
        },
        globalChanges: {
          'membership/party1.swf': 'archives:MembershipParty1-PenguinCup.swf',
          'content/party_icon.swf': 'archives:ContentParty_icon-PenguinCup.swf',
          'close_ups/end_game.swf': 'archives:Close_upsEnd_game-PenguinCup.swf',
          'close_ups/character_dialogue_login.swf': 'archives:Close_upsCharacter_dialogue_login-PenguinCup.swf',
          'close_ups/character_dialogue_update.swf': 'archives:Close_upsCharacter_dialogue_update-PenguinCup.swf'
        },
        fileChanges: {
          'play/v2/client/party.swf': 'recreation:party_scripts/penguin_cup_2014.swf',
          'play/v2/content/global/avatar/sprites/ball_kick.swf': 'archives:AvatarSpritesBall_kick.swf',
          'play/v2/content/global/avatar/sprites/victory_1.swf': 'archives:AvatarSpritesVictory_1.swf',
          'play/v2/content/global/avatar/sprites/victory_2.swf': 'archives:AvatarSpritesVictory_2.swf',
          'play/v2/content/global/avatar/sprites/victory_3.swf': 'archives:AvatarSpritesVictory_3.swf',
          'play/v2/content/global/avatar/sprites/victory_4.swf': 'archives:AvatarSpritesVictory_4.swf'
        }
      }
    }
  },
  { date: '2014-07-03', end: [ 'party2' ] },
  {
    date: '2014-07-17',
    rooms: {
      dojo: 'archives:RoomsDojo_7.swf'
    },
    gameUpgrades: {
      newItems: [],
      removed: [5037, 5039, 5038, 5071, 5072, 5070, 5121]
    },
    temp: {
      party: {
        partyName: 'Music Jam 2014',
        partyIcon: 'party',
        rooms: {
          party4: 'archives:RoomsParty4-MusicJam2014.swf',
          dock: 'archives:RoomsDock-MusicJam2014.swf',
          party6: 'archives:RoomsParty6-MusicJam2014.swf',
          party5: 'archives:RoomsParty5-MusicJam2014.swf',
          party3: 'archives:RoomsParty3-MusicJam2014.swf',
          party1: 'archives:RoomsParty1-MusicJam2014.swf',
          party2: 'archives:RoomsParty2-MusicJam2014.swf',
          town: 'archives:RoomsTown-MusicJam2014.swf'
        },
        music: {
          party4: 727,
          dock: 722,
          party6: 729,
          party5: 728,
          party3: 726,
          party1: 724,
          party2: 725,
          town: 723
        },
        map: 'archives:ContentMap-MusicJam2014.swf',
        mapNote: 'archives:ENClose_upsParty_map_note-MusicJam2014.swf',
        startscreens: [ 'archives:LoginScreen-ENMusicJam20141.swf' ],
        localChanges: {
          'close_ups/quest_interface.swf': { en: ['archives:ENClose_upsQuest_interface-MusicJam2014.swf', 'w.p2014.music.partyinterface'] },
          'close_ups/party_igloo_list.swf': { en: ['archives:ENClose_upsParty_igloo_list-MusicJam2014.swf', 'w.p2014.music.igloolist'] }
        },
        globalChanges: {
          'membership/party1.swf': 'archives:MembershipParty1-MusicJam2014.swf',
          'close_ups/party_map.swf': ['archives:Close_upsParty_map-MusicJam2014.swf', 'w.p2014.music.partymap'],
          'content/party_icon.swf': 'archives:ContentParty_icon-MusicJam2014.swf',
          'close_ups/character_dialogue_login.swf': ['archives:Close_upsCharacter_dialogue_login-MusicJam2014.swf', 'w.p2014.music.login'],
          'rooms/concerts/concert_cadence.swf': ['archives:RoomsConcertsConcert_cadence.swf', 'w.p2014.concert.cadence'],
          'rooms/concerts/concert_violetta.swf': ['archives:RoomsConcertsConcert_violetta.swf', 'w.p2014.concert.violetta'],
          'rooms/concerts/concert_djcole.swf': ['archives:RoomsConcertsConcert_djcole.swf', 'w.p2014.concert.djcole'],
          'rooms/concerts/concert_sabrina.swf': ['archives:RoomsConcertsConcert_sabrina.swf', 'w.p2014.concert.sabrina'],
          'rooms/concerts/concert_zendaya.swf': ['archives:RoomsConcertsConcert_zendaya.swf', 'w.p2014.concert.zendaya']
        },
        fileChanges: {
          'play/v2/client/party.swf': 'recreation:party_scripts/music_jam_2014.swf'
        },
        gameStrings: {
          'w.map.musiccruise': 'Music Cruise',
          'w.p2014.party.map.open': 'Open',
          'w.p2014.music.map.header': 'Music Cruise',
          'w.p2014.music.map.content': 'Explore the ship and rock out with the stars!',
          'w.p2014.music.dialogue.login': 'Welcome aboard the Music Cruise! Catch performances on the Main Stage, make tracks in SoundStudio and collect free items all party long!',
          'w.p2014.performers.cadence': 'Cadence',
          'w.p2014.performers.violetta': 'Violetta',
          'w.p2014.performers.djcole': 'Cole Plante',
          'w.p2014.performers.sabrina': 'Sabrina',
          'w.p2014.performers.zendaya': 'Zendaya'
        }
      }
    }
  },
  {
    date: '2014-07-31',
    end: [ 'party' ],
    temp: {
      party2: {
        partyName: 'Turbo Race 3000',
        partyIcon: 'party',
        rooms: { rink: 'archives:RoomsRink-TurboRace3000.swf' },
        music: { rink: 733 }
      }
    }
  },
  { date: '2014-08-07', end: [ 'party2' ] },
  {
    date: '2014-08-21',
    temp: {
      party: {
        partyName: 'Frozen Party',
        partyIcon: 'party',
        rooms: {
          beach: 'archives:RoomsBeach-FrozenParty.swf',
          cove: 'archives:RoomsCove-FrozenParty.swf',
          dock: 'archives:RoomsDock-FrozenParty.swf',
          forest: 'archives:RoomsForest-FrozenParty.swf',
          party1: 'archives:RoomsParty1-FrozenParty.swf',
          plaza: 'archives:RoomsPlaza-FrozenParty.swf',
          forts: 'archives:RoomsForts-FrozenParty.swf',
          town: 'archives:RoomsTown-FrozenParty.swf',
          partysolo1: 'archives:RoomsConcertsElsaconcert.swf'
        },
        music: {
          beach: 738,
          cove: 742,
          dock: 740,
          forest: 741,
          party1: 739,
          plaza: 743,
          forts: 742,
          town: 743
        },
        map: 'archives:ContentMap-FrozenParty.swf',
        startscreens: [
          'archives:LoginScreen-ENFrozen-free-player-pp.swf',
          'archives:LoginScreen-ENFrozen-member-pp.swf'
        ],
        localChanges: {
          'close_ups/quest_interface.swf': { en: 'archives:ENClose_upsQuest_interface-FrozenParty.swf' }
        },
        globalChanges: {
          'membership/party1.swf': 'archives:MembershipParty1-FrozenParty.swf',
          'content/party_icon.swf': 'archives:ContentParty_icon-FrozenParty.swf',
          'close_ups/character_dialogue_login.swf': 'archives:Close_upsCharacter_dialogue_login-FrozenParty.swf',
          'close_ups/ice_palace_locked.swf': 'archives:Close_upsIce_palace_locked-FrozenParty.swf',
          'close_ups/character_dialogue_elsa.swf': 'archives:Close_upsCharacter_dialogue_Elsa-FrozenParty.swf'
        },
        fileChanges: {
          'play/v2/client/party.swf': 'recreation:party_scripts/frozen_2014.swf',
          'play/v2/content/global/avatar/sprites/olaf.swf': 'archives:AvatarSpritesOlaf.swf',
          'play/v2/content/global/avatar/sprites/marshmallow.swf': 'archives:AvatarSpritesMarshmallow.swf'
        }
      }
    }
  },
  { date: '2014-09-04', end: [ 'party' ] },
  {
    date: '2014-09-18',
    dateReference: 'mall',
    temp: {
      party: {
        partyName: 'School & Skate Party',
        fileChanges: {
          'play/v2/client/party.swf': 'recreation:party_scripts/school_skate_2014.swf'
        },
        partyIcon: 'party',
        rooms: {
          party1: 'archives:RoomsParty1-School&SkateParty.swf',
          forest: 'archives:RoomsForest-School&SkateParty.swf',
          party2: 'archives:RoomsParty2-School&SkateParty.swf',
          shack: 'archives:RoomsShack-School&SkateParty.swf',
          pizza: 'archives:RoomsPizzaParlor-School&SkateParty.swf',
          plaza: 'archives:RoomsPlaza-School&SkateParty.swf',
          school: 'archives:RoomsSchool-School&SkateParty.swf',
          mall: 'archives:RoomsStage-School&SkateParty.swf',
          skatepark: 'archives:RoomsSkatepark.swf'
        },
        music: {
          party1: 751,
          forest: 757,
          party2: 753,
          shack: 752,
          pizza: 756,
          plaza: 748,
          school: 750,
          mall: 749,
          skatepark: 754
        },
        map: 'archives:ContentMap-School&SkateParty.swf',
        startscreens: [ 'archives:LoginScreen-ENSchoolSkate-september-party-pp.swf' ],
        localChanges: {
          'close_ups/quest_interface.swf': { en: 'archives:ENClose_upsQuest_interface-School&SkateParty.swf' }
        },
        globalChanges: {
          'membership/party1.swf': 'archives:MembershipParty1-School&SkateParty.swf',
          'content/party_icon.swf': 'archives:ContentParty_icon-School&SkateParty.swf',
          'close_ups/character_dialogue_login.swf': 'archives:Close_upsCharacter_dialogue_login-School&SkateParty.swf',
          'close_ups/character_dialogue_success.swf': 'archives:Close_upsCharacter_dialogue_success-School&SkateParty.swf'
        }
      }
    }
  },
  { date: '2014-10-02', end: [ 'party' ] },
  {
    date: '2014-10-23',
    temp: {
      party: {
        partyName: 'Halloween Party 2014',
        partyIcon: 'party',
        rooms: {
          hotellobby: 'archives:RoomsHotellobby-HalloweenParty2014.swf',
          hotelroof: 'archives:RoomsHotelroof-HalloweenParty2014.swf',
          hotelspa: 'archives:RoomsHotelspa-HalloweenParty2014.swf',
          beach: 'archives:RoomsBeach-HalloweenParty2014.swf',
          beacon: 'archives:RoomsBeacon-HalloweenParty2014.swf',
          book: 'archives:RoomsBook-HalloweenParty2014.swf',
          cave: 'archives:RoomsCave-HalloweenParty2014.swf',
          shop: 'archives:RoomsShop-HalloweenParty2014.swf',
          cloudforest: 'archives:RoomsCloudForest-HalloweenParty2014.swf',
          cove: 'archives:RoomsCove-HalloweenParty2014.swf',
          dock: 'archives:RoomsDock-HalloweenParty2014.swf',
          dojo: 'archives:RoomsDojo-HalloweenParty2014.swf',
          dojoext: 'archives:RoomsDojoExt-HalloweenParty2014.swf',
          dojofire: 'archives:RoomsDojoFire-HalloweenParty2014.swf',
          forest: 'archives:RoomsForest-HalloweenParty2014.swf',
          berg: 'archives:RoomsBerg-HalloweenParty2014.swf',
          light: 'archives:RoomsLight-HalloweenParty2014.swf',
          attic: 'archives:RoomsAttic-HalloweenParty2014.swf',
          shack: 'archives:RoomsShack-HalloweenParty2014.swf',
          pet: 'archives:RoomsPet-HalloweenParty2014.swf',
          pizza: 'archives:RoomsPizza-HalloweenParty2014.swf',
          plaza: 'archives:RoomsPlaza-HalloweenParty2014.swf',
          park: 'archives:RoomsPark-HalloweenParty2014.swf',
          school: 'archives:RoomsSchool-HalloweenParty2014.swf',
          skatepark: 'archives:RoomsSkatepark-HalloweenParty2014.swf',
          mtn: 'archives:RoomsMtn-HalloweenParty2014.swf',
          lodge: 'archives:RoomsLodge-HalloweenParty2014.swf',
          village: 'archives:RoomsVillage-HalloweenParty2014.swf',
          dojosnow: 'archives:RoomsDojoSnow-HalloweenParty2014.swf',
          forts: 'archives:RoomsForts-HalloweenParty2014.swf',
          rink: 'archives:RoomsRink-HalloweenParty2014.swf',
          town: 'archives:RoomsTown-HalloweenParty2014.swf',
          party9: 'archives:RoomsParty9-HalloweenParty2014.swf',
          party3: 'archives:RoomsParty3-HalloweenParty2014.swf',
          party12: 'archives:RoomsParty12-HalloweenParty2014.swf',
          party13: 'archives:RoomsParty13-HalloweenParty2014.swf',
          party14: 'archives:RoomsParty14-HalloweenParty2014.swf',
          party15: 'archives:RoomsParty15-HalloweenParty2014.swf',
          party16: 'archives:RoomsParty16-HalloweenParty2014.swf',
          party17: 'archives:RoomsParty17-HalloweenParty2014.swf',
          party1: 'archives:RoomsParty1-HalloweenParty2014.swf',
          party5: 'archives:RoomsParty5-HalloweenParty2014.swf',
          party4: 'archives:RoomsParty4-HalloweenParty2014.swf',
          party7: 'archives:RoomsParty7-HalloweenParty2014.swf',
          party8: 'archives:RoomsParty8-HalloweenParty2014.swf',
          party6: 'archives:RoomsParty6-HalloweenParty2014.swf',
          party2: 'archives:RoomsParty2-HalloweenParty2014.swf',
          party10: 'archives:RoomsParty10-HalloweenParty2014.swf',
          partysolo1: 'archives:RoomsPartysolo1-HalloweenParty2014.swf',
          party11: 'archives:RoomsParty11-HalloweenParty2014.swf',
          partysolo2: 'archives:RoomsPartysolo2-HalloweenParty2014.swf'
        },
        music: {
          hotellobby: 766,
          hotelroof: 767,
          hotelspa: 768,
          beach: 495,
          beacon: 504,
          book: 669,
          cave: 670,
          shop: 345,
          cloudforest: 759,
          cove: 496,
          dock: 498,
          dojo: 403,
          dojoext: 760,
          dojofire: 764,
          forest: 499,
          berg: 758,
          light: 588,
          attic: 672,
          shack: 503,
          pet: 659,
          pizza: 676,
          plaza: 779,
          park: 769,
          school: 502,
          skatepark: 754,
          mtn: 505,
          lodge: 589,
          village: 505,
          dojosnow: 765,
          forts: 500,
          rink: 501,
          town: 779,
          party9: 762,
          party3: 772,
          party12: 772,
          party13: 772,
          party14: 772,
          party15: 772,
          party16: 772,
          party17: 772,
          party1: 770,
          party5: 774,
          party4: 773,
          party7: 775,
          party8: 776,
          party6: 761,
          party2: 343,
          party10: 777,
          partysolo1: 777,
          party11: 778,
          partysolo2: 778
        },
        map: 'archives:ContentMap-HalloweenParty2014.swf',
        startscreens: [ 'archives:LoginScreen-ENHalloweenParty2014-october-halloween-pp.swf' ],
        localChanges: {
          'close_ups/quest_interface.swf': { en: 'archives:ENClose_upsQuest_interface-HalloweenParty2014.swf' }
        },
        globalChanges: {
          'membership/party1.swf': 'archives:MembershipParty1-HalloweenParty2014.swf',
          'membership/party2.swf': 'archives:MembershipParty2-HalloweenParty2014.swf',
          'close_ups/character_dialogue_login.swf': 'archives:Close_upsCharacter_dialogue_login2-HalloweenParty2014.swf',
          'close_ups/character_dialogue_bellhop.swf': 'archives:Close_upsCharacter_dialogue_bellhop-HalloweenParty2014.swf',
          'close_ups/character_dialogue_gariwald.swf': 'archives:Close_upsCharacter_dialogue_gariwald-HalloweenParty2014.swf',
          'close_ups/character_dialogue_ghost_intro.swf': 'archives:Close_upsCharacter_dialogue_ghost_intro-HalloweenParty2014.swf',
          'close_ups/character_dialogue_ghost_defeated.swf': 'archives:Close_upsCharacter_dialogue_ghost_defeated-HalloweenParty2014.swf'
        },
        fileChanges: {
          'play/v2/content/global/rooms/NOTLS-ALL-EN.swf': 'archives:RoomsNOTLS-ALL-EN-HalloweenParty2014.swf',
          'play/v2/client/party.swf': 'unknown:ghosts/party.swf'
        }
      }
    }
  },
  {
    date: '2014-10-24',
    temp: {
      party2: {
        partyName: '9th Anniversary Party',
        partyIcon: 'party',
        rooms: { coffee: 'archives:RoomsCoffee-9thAnniversaryParty.swf' },
        music: { coffee: 763 },
        localChanges: {
          'forms/library.swf': { en: 'archives:ENLibraryOct2014.swf' },
          'books/year1314.swf': { en: 'archives:ENBooksYear1314.swf' }
        }
      }
    }
  },
  { date: '2014-10-25', end: [ 'party2' ] },
  { date: '2014-11-06', end: [ 'party' ] },
  {
    date: '2014-11-20',
    temp: {
      party: {
        partyName: 'Pirate Party 2014',
        fileChanges: {
          'play/v2/client/party.swf': 'recreation:party_scripts/pirate_2014.swf'
        },
        partyIcon: 'party',
        rooms: {
          beach: 'archives:RoomsBeach-PirateParty2014.swf',
          cove: 'archives:RoomsCove-PirateParty2014.swf',
          dock: 'archives:RoomsDock-PirateParty2014.swf',
          forest: 'archives:RoomsForest-PirateParty2014.swf',
          plaza: 'archives:RoomsPlaza-PirateParty2014.swf',
          forts: 'archives:RoomsForts-PirateParty2014.swf',
          town: 'archives:RoomsTown-PirateParty2014.swf',
          partysolo1: 'archives:RoomsPartysolo1-PirateParty2014.swf'
        },
        music: {
          beach: 790,
          cove: 795,
          dock: 791,
          forest: 797,
          plaza: 794,
          forts: 793,
          town: 792,
          partysolo1: 796
        },
        map: 'archives:ContentMap-PirateParty2014.swf',
        startscreens: [ 'archives:LoginScreen-ENPirateParty2014-november-party-pp.swf' ],
        localChanges: {
          'close_ups/quest_interface.swf': { en: 'archives:ENClose_upsQuest_interface-PirateParty2014.swf' }
        },
        globalChanges: {
          'membership/party1.swf': 'archives:MembershipParty1-PirateParty2014.swf',
          'telescope/telescope.swf': 'archives:PirateParty2014TelescopeComingClose.swf',
          'close_ups/character_dialogue_login.swf': 'archives:Close_upsCharacter_dialogue_login-PirateParty2014.swf',
          'close_ups/character_dialogue_crabfight.swf': 'archives:Close_upsCharacter_dialogue_crabfight-PirateParty2014.swf',
          'close_ups/character_dialogue_swordfight.swf': 'archives:Close_upsCharacter_dialogue_swordfight-PirateParty2014.swf',
          'close_ups/character_dialogue_congratulations.swf': 'archives:Close_upsCharacter_dialogue_congratulations-PirateParty2014.swf',
          'close_ups/finale_comic.swf': 'archives:Close_upsFinale_comic-PirateParty2014.swf'
        }
      }
    }
  },
  {
    date: '2014-12-04',
    end: [ 'party' ],
    temp: {
      party2: {
        partyName: 'Merry Walrus Parade',
        fileChanges: {
          'play/v2/client/party.swf': 'recreation:party_scripts/merry_walrus_parade_2014.swf'
        },
        partyIcon: 'party',
        rooms: {
          village: 'archives:RoomsVillage-MerryWalrusParade.swf',
          party1: 'archives:RoomsParty1-MerryWalrusParade.swf'
        },
        music: { village: 818, party1: 811 }
      }
    }
  },
  {
    date: '2014-12-18',
    end: [ 'party2' ],
    temp: {
      party: {
        partyName: 'Merry Walrus Party',
        fileChanges: {
          'play/v2/client/party.swf': 'recreation:party_scripts/merry_walrus_2014.swf'
        },
        partyIcon: 'party',
        rooms: {
          beach: 'archives:RoomsBeach-MerryWalrusParty2014.swf',
          coffee: 'archives:RoomsCoffee-MerryWalrusParty2014.swf',
          dock: 'archives:RoomsDock-MerryWalrusParty2014.swf',
          forest: 'archives:RoomsForest-MerryWalrusParty2014.swf',
          shack: 'archives:RoomsShack-MerryWalrusParty2014.swf',
          plaza: 'archives:RoomsPlaza-MerryWalrusParty2014.swf',
          school: 'archives:RoomsSchool-MerryWalrusParty2014.swf',
          forts: 'archives:RoomsForts-MerryWalrusParty2014.swf',
          mall: 'archives:RoomsStage-MerryWalrusParty2014.swf',
          town: 'archives:RoomsTown-MerryWalrusParty2014.swf',
          partysolo1: 'archives:RoomsPartysolo1-MerryWalrusParty2014.swf'
        },
        music: {
          beach: 804,
          coffee: 806,
          dock: 808,
          forest: 809,
          shack: 815,
          plaza: 812,
          school: 814,
          forts: 810,
          mall: 819,
          town: 820,
          partysolo1: 821
        },
        startscreens: [ 'archives:LoginScreen-ENMerryWalrusParty-merry-walrus-pp.swf' ],
        localChanges: {
          'close_ups/cfc_interface.swf': { en: 'archives:ENClose_upsCfc_interface-MerryWalrusParty2014.swf' },
          'close_ups/quest_interface.swf': { en: 'archives:ENClose_upsQuest_interface-MerryWalrusParty2014.swf' }
        },
        globalChanges: {
          'membership/party1.swf': 'archives:MembershipParty1-MerryWalrusParty2014.swf',
          'content/party_icon.swf': 'archives:ContentParty_icon-MerryWalrusParty2014.swf',
          'close_ups/character_dialogue_login.swf': 'archives:Close_upsCharacter_dialogue_login-MerryWalrusParty2014.swf',
          'close_ups/character_dialogue_congratulations.swf': 'archives:Close_upsCharacter_dialogue_congratulations-MerryWalrusParty2014.swf'
        },
        coinsForChange: true
      }
    }
  },
  { date: '2015-01-01', end: [ 'party' ] }
];
