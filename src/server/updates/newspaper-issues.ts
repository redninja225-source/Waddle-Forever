import { Update } from ".";

const MISSING_SECRET_OVERLAYS = new Set(['20130103', '20130424', '20130501']);
const MISSING_FEATURE_MORE = new Set(['20130828', '20141008', '20141112']);
const SUPPORT_MORE_DATES = new Set(['20130103', '20130424', '20130501']);
const ANSWER_DATES = new Set([
  '20130206', '20130404', '20130410', '20131106', '20131113', '20131120',
  '20131127', '20131204', '20140226', '20140319', '20140430', '20140507',
  '20140604', '20140618', '20140709', '20140910', '20150121', '20150128',
  '20150311'
]);

function formatIssueDate(date: string) {
  return `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
}

export function getNewspaperIssue(date: string, edition: number, title = 'CLUB PENGUIN TIMES'): NonNullable<Update['issue']> {
  const paper = (file: string) => `svanilla:media/play/v2/content/local/en/news/papers/${date}/content/${file}`;
  const issue: NonNullable<Update['issue']> = {
    type: 'as3',
    year: Number(date.slice(0, 4)),
    month: Number(date.slice(4, 6)),
    day: Number(date.slice(6, 8)),
    edition,
    title,
    askFront: paper('front/askAuntArctic.swf'),
    dividersFront: paper('front/dividers.swf'),
    featureStory: paper('front/featureStory.swf'),
    featureMore: MISSING_FEATURE_MORE.has(date) ? undefined : paper('overlays/featureMore.swf'),
    headerFront: paper('front/header.swf'),
    navigationFront: paper('front/navigation.swf'),
    newsFlash: paper('front/newsFlash.swf'),
    supportStory: paper('front/supportStory.swf'),
    upcomingEvents: paper('front/upcomingEvents.swf'),
    askBack: date === '20130501' ? 'archives:ENNews393AskAuntArcticContinued.swf' : paper(date === '20130424' ? 'front/askAuntArctic.swf' : 'back/askAuntArctic.swf'),
    dividersBack: paper('back/dividers.swf'),
    headerBack: paper('back/header.swf'),
    jokes: paper('back/jokesAndRiddles.swf'),
    navigationBack: paper('back/navigation.swf'),
    submit: paper('back/submitYourContent.swf'),
    secrets: paper('back/secrets.swf'),
    secret: MISSING_SECRET_OVERLAYS.has(date) ? undefined : paper('overlays/secretOverlay.swf')
  };
  if (SUPPORT_MORE_DATES.has(date)) {
    issue.supportMore = paper('overlays/supportMore.swf');
  }
  if (ANSWER_DATES.has(date)) {
    issue.answers = paper('overlays/riddlesAnswers.swf');
  }
  return issue;
}

export function issueDates(dates: string, firstEdition: number): [string, number][] {
  return dates.split(',').map((date, index) => [formatIssueDate(date), firstEdition + index]);
}

export function mergeIssueUpdates(updates: Update[], issues: [string, number][], titles: Record<number, string> = {}): Update[] {
  const merged = [...updates];
  for (const [date, edition] of issues) {
    const issue = getNewspaperIssue(date.replace(/-/g, ''), edition, titles[edition]);
    const update = merged.find(update => update.date === date);
    if (update === undefined) {
      merged.push({ date, issue });
    } else {
      update.issue = issue;
    }
  }
  merged.sort((a, b) => a.date.localeCompare(b.date));
  return merged;
}

export const NEWSPAPER_ISSUES_2013: [string, number][] = issueDates(
  '20130103,20130109,20130116,20130123,20130130,20130206,20130213,20130220,20130227,20130306,20130313,20130320,20130327,20130404,20130410,20130417,20130424,20130501,20130508,20130515,20130522,20130529,20130605,20130612,20130619,20130626,20130703,20130710,20130717,20130724,20130731,20130807,20130814,20130821,20130828,20130904,20130911,20130918,20130925,20131002,20131009,20131016,20131023,20131101,20131106,20131113,20131120,20131127,20131204,20131211,20131218,20131226',
  376
);

export const NEWSPAPER_ISSUES_2014: [string, number][] = issueDates(
  '20140102,20140108,20140115,20140122,20140129,20140205,20140212,20140219,20140226,20140305,20140312,20140319,20140326,20140402,20140409,20140416,20140423,20140430,20140507,20140514,20140521,20140528,20140604,20140611,20140618,20140625,20140702,20140709,20140716,20140723,20140730,20140806,20140813,20140820,20140827,20140903,20140910,20140917,20140924,20141001,20141008,20141015,20141022,20141029,20141105,20141112,20141119,20141126,20141203,20141210,20141217,20141224,20141231',
  428
);

export const NEWSPAPER_ISSUES_2015: [string, number][] = issueDates(
  '20150107,20150114,20150121,20150128,20150204,20150211,20150218,20150225,20150304,20150311,20150318,20150325,20150401,20150408,20150415,20150422,20150429,20150506,20150513,20150520,20150527,20150603,20150610,20150617,20150624,20150630,20150708,20150715,20150722,20150729,20150805,20150812,20150819,20150826,20150902,20150909,20150916,20150923,20150930,20151007,20151014,20151021,20151028,20151104,20151110,20151118,20151125,20151202,20151209,20151216,20151223,20151230',
  480
);

export const NEWSPAPER_ISSUES_2016: [string, number][] = issueDates(
  '20160106,20160113,20160120,20160127,20160203,20160210,20160217,20160224,20160302,20160309,20160316,20160323,20160330,20160406,20160420,20160504,20160518,20160608,20160622,20160706,20160720,20160803,20160817,20160831,20160914,20160928,20161019,20161102,20161116,20161130,20161214',
  533
);

export const NEWSPAPER_TITLES_2016: Record<number, string> = {
  560: 'THE BAND IS BACK!',
  561: 'HOW TO WRITE A HIT',
  562: 'HOLIDAY TRADITION RETURNS',
  563: 'COINS COMING IN!'
};
