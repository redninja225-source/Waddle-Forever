import { PenguinHandler } from "./handlers";

/**
 * Generic party-cookie service. Every 2013+ party script requests its server
 * cookie through `<handler>#partycookie` when the party initializes and expects
 * the party settings message plus a `partycookie` JSON response back. Without
 * an answer, party interfaces wait forever (the SoundStudio infinite loading
 * issue in Music Jam 2014 came from this same pattern).
 */
type PartyServiceSpec = {
  /** Extension prefix, e.g. 'frozen' -> requests 'frozen#partycookie' */
  handler: string;
  /** Name of the party settings response message (default 'partyservice') */
  settingsResponse?: string;
  /** Command used to mark a party message as viewed, e.g. 'fpmsgviewed' */
  viewedCommand?: string;
};

export const PARTY_SERVICES: PartyServiceSpec[] = [
  { handler: 'mstr' }, // Monsters University Takeover
  { handler: 'i' }, // Teen Beach Movie Summer Jam
  { handler: 'epfparty', settingsResponse: 'epfpartysettings' }, // Operation Puffle / Fair 2014
  { handler: 'christmas', settingsResponse: 'christmass' }, // Coins For Change
  { handler: 'prehistoric', settingsResponse: 'prehistorics', viewedCommand: 'prehistoricmsgviewed' },
  { handler: 'fair', viewedCommand: 'fmsgviewed' },
  { handler: 'muppets', viewedCommand: 'mmsgviewed' },
  { handler: 'puffleparty', viewedCommand: 'ppmsgviewed' },
  { handler: 'future', viewedCommand: 'fpmsgviewed' },
  { handler: 'soccerparty', viewedCommand: 'spmsgviewed' },
  { handler: 'frozen', viewedCommand: 'fpmsgviewed' },
  { handler: 'school', viewedCommand: 'msgviewed' },
  { handler: 'pirate', viewedCommand: 'msgviewed' },
  { handler: 'xmas2014' }, // Merry Walrus
  { handler: 'sw2015' }, // Star Wars Rebels Takeover
  { handler: 'music2015' }, // SoundStudio Party
  { handler: 'puffle2015' }, // Puffle Party 2015
  { handler: 'puffleleadup2015' },
  { handler: 'insideout' }, // Inside Out Party
  { handler: 'insideout1' },
  { handler: 'outfitcontests' }, // Fashion Festival
  { handler: 'descendants' }, // Descendants Party
  { handler: 'anniversary' }, // 10th Anniversary Party
  { handler: 'shp' } // Super Hero
];

/** Viewed-message memory, per penguin id then handler (session-scoped) */
const viewedMessages = new Map<number, Map<string, Set<number>>>();

const VIEWED_SLOTS = 20;

function viewedArray(penguinId: number, handler: string): number[] {
  const seen = viewedMessages.get(penguinId)?.get(handler) ?? new Set();
  const arr = new Array<number>(VIEWED_SLOTS).fill(0);
  for (const i of seen) if (i >= 0 && i < VIEWED_SLOTS) arr[i] = 1;
  return arr;
}

export const createPartyCookieHandler = (spec: PartyServiceSpec): PenguinHandler<[]> => {
  const settings = spec.settingsResponse ?? 'partyservice';
  return ({ msg, penguin }) => {
    msg.send(penguin, settings, JSON.stringify({ partySettings: {} }));
    msg.send(penguin, 'partycookie', JSON.stringify({ msgViewedArray: viewedArray(penguin.id, spec.handler) }));
  };
};

export const createPartyViewedHandler = (spec: PartyServiceSpec): PenguinHandler<[number]> => {
  return ({ msg, penguin }, message) => {
    let byPenguin = viewedMessages.get(penguin.id);
    if (byPenguin === undefined) {
      byPenguin = new Map();
      viewedMessages.set(penguin.id, byPenguin);
    }
    let set = byPenguin.get(spec.handler);
    if (set === undefined) {
      set = new Set();
      byPenguin.set(spec.handler, set);
    }
    set.add(message);
    msg.send(penguin, 'partycookie', JSON.stringify({ msgViewedArray: viewedArray(penguin.id, spec.handler) }));
  };
};
