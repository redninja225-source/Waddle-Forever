export type StoryQuest = {
  id: string;
  title: string;
  description: string;
  era: string;
  rooms: number[];
  reward: number;
};

export type TimelineAchievement = {
  id: string;
  title: string;
  description: string;
};

export const STORY_QUESTS: StoryQuest[] = [
  {
    id: 'island-tour',
    title: 'Island Tour',
    description: 'Visit the Town, Coffee Shop, Pizza Parlor, and Dock.',
    era: '2005-09-21',
    rooms: [100, 110, 330, 800],
    reward: 150
  },
  {
    id: 'forts-meetup',
    title: 'Snow Fort Meetup',
    description: 'Visit the Snow Forts.',
    era: '2005-10-24',
    rooms: [801],
    reward: 100
  },
  {
    id: 'cart-ready',
    title: 'Cart Ready',
    description: 'Travel through the Mine Shack and enter the Mine.',
    era: '2006-06-06',
    rooms: [807, 808],
    reward: 300
  },
  {
    id: 'agent-check',
    title: 'Agent Check',
    description: 'Visit the original PSA HQ.',
    era: '2006-05-29',
    rooms: [803],
    reward: 250
  },
  {
    id: 'wave-watch',
    title: 'Wave Watch',
    description: 'Visit the Cove to watch the surf.',
    era: '2007-06-04',
    rooms: [810],
    reward: 300
  },
  {
    id: 'deep-dive',
    title: 'Deep Dive Prep',
    description: 'Visit the Iceberg and prepare for Aqua Grabber.',
    era: '2008-02-19',
    rooms: [805],
    reward: 400
  },
  {
    id: 'time-command',
    title: 'Time Command',
    description: 'Visit the Time Command Center.',
    era: '2005-09-21',
    rooms: [879],
    reward: 200
  }
];

export const TIMELINE_ACHIEVEMENTS: TimelineAchievement[] = [
  {
    id: 'first-quest',
    title: 'Story Starter',
    description: 'Complete your first Story Mode quest.'
  },
  {
    id: 'island-explorer',
    title: 'Island Explorer',
    description: 'Visit five different rooms in Story Mode.'
  },
  {
    id: 'social-penguin',
    title: 'Social Penguin',
    description: 'Use an NPC interaction action.'
  },
  {
    id: 'quest-checker',
    title: 'Quest Checker',
    description: 'Ask an NPC about your current quest.'
  },
  {
    id: 'time-traveler',
    title: 'Time Traveler',
    description: 'Unlock a new era in Story Mode.'
  },
  {
    id: 'code-breaker',
    title: 'Code Breaker',
    description: 'Redeem a secret code.'
  },
  {
    id: 'coin-collector',
    title: 'Coin Collector',
    description: 'Hold at least 5,000 coins.'
  }
];

export const getQuestsForEra = (era: string): StoryQuest[] => {
  return STORY_QUESTS.filter(quest => quest.era <= era);
};

export const isQuestComplete = (quest: StoryQuest, visitedRooms: number[]): boolean => {
  return quest.rooms.every(room => visitedRooms.includes(room));
};
