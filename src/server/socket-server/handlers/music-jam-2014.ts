import { PenguinMessenger } from "../messenger";
import { World } from "../world/world";
import { WorldPenguin } from "../world/world-penguin";
import { PenguinHandler } from "./handlers";

const PARTY_START = '2014-07-17';
const DAY_MS = 24 * 60 * 60 * 1000;
/** Time between the start of two performances */
const SLOT_MS = 5 * 60 * 1000;
/** The client only treats a show as ongoing if less than 120 seconds have elapsed */
const SHOW_MS = 120 * 1000;

/** Names must match the performer tokens in MusicPartyConstants (spaces are removed by the client) */
const PERFORMERS = [
  { id: 1, name: 'Cadence', day: 0 },
  { id: 2, name: 'Violetta', day: 2 },
  { id: 3, name: 'DJ Cole', day: 4 },
  { id: 4, name: 'Sabrina', day: 6 },
  { id: 5, name: 'Zendaya', day: 8 }
];

/** Rewards unlocked in the party interface, unlock days match the day panels of the interface */
const REWARDS = [
  { unlockDay: 1, memberItemId: 24146, nonmemberItemId: 3211 },
  { unlockDay: 3, memberItemId: 158, nonmemberItemId: 5463 },
  { unlockDay: 5, memberItemId: 24156, nonmemberItemId: 1891 },
  { unlockDay: 7, memberItemId: 24154, nonmemberItemId: 5462 },
  { unlockDay: 9, memberItemId: 24157, nonmemberItemId: 5461 }
];
const PUFFLE_REWARD = 158;
const TOUR_BUS_IGLOO = 73;

const showTimers = new WeakMap<WorldPenguin, NodeJS.Timeout>();

function getPartyDay(date: string): number {
  const day = Math.floor((Date.parse(date) - Date.parse(PARTY_START)) / DAY_MS);
  return Math.min(Math.max(Number.isNaN(day) ? 0 : day, 0), 9);
}

function getSchedule(date: string, now = Date.now()) {
  // performers unlock across the party historically, but the timeline date stays pinned,
  // which would lock the rotation to Cadence forever; rotate everyone instead
  const unlocked = PERFORMERS;
  const slot = Math.floor(now / SLOT_MS);
  const at = (offset: number) => unlocked[(slot + offset) % unlocked.length].id;
  return {
    current: at(0),
    next: at(1),
    following: at(2),
    elapsed: now - slot * SLOT_MS,
    untilNext: (slot + 1) * SLOT_MS - now
  };
}

function sendPartyCookie(msg: PenguinMessenger, penguin: WorldPenguin) {
  msg.send(penguin, 'partycookie', JSON.stringify({ msgViewedArray: penguin.musicJam2014.viewed }));
}

export const handleMusicPartyCookie: PenguinHandler<[]> = ({ msg, penguin, data }) => {
  msg.send(penguin, 'partyservice', JSON.stringify({
    partySettings: {
      partyIglooItems: [TOUR_BUS_IGLOO],
      unlockDayIndex: getPartyDay(data.getDate())
    },
    musicJamRewards: REWARDS,
    musicJamPuffleReward: PUFFLE_REWARD,
    concertList: PERFORMERS.map(({ id, name }) => ({ id, name }))
  }));
  sendPartyCookie(msg, penguin);
}

export const handleMusicPartyMessageViewed: PenguinHandler<[number]> = ({ msg, penguin, prst }, message) => {
  penguin.musicJam2014.setViewed(message);
  prst(penguin);
  sendPartyCookie(msg, penguin);
}

function scheduleNextShow(world: World, msg: PenguinMessenger, penguin: WorldPenguin, date: string, delay: number) {
  clearTimeout(showTimers.get(penguin));
  showTimers.set(penguin, setTimeout(() => {
    showTimers.delete(penguin);
    if (world.getPenguin(penguin.id) !== penguin) {
      return;
    }
    const { current, next } = getSchedule(date);
    msg.send(penguin, 'mpshow', current, 0, next);
  }, delay));
}

export const handleMusicPartyCountdown: PenguinHandler<[number]> = ({ msg, penguin, data, world }) => {
  const date = data.getDate();
  const { current, next, following, elapsed, untilNext } = getSchedule(date);
  if (elapsed < SHOW_MS) {
    msg.send(penguin, 'mpshow', current, elapsed, next);
  }
  msg.send(penguin, 'mpcountdown', next, untilNext, following);
  scheduleNextShow(world, msg, penguin, date, untilNext);
}
