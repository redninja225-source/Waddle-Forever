// eslint-disable-next-line @typescript-eslint/no-var-requires
const pjson = require('../../package.json');

export const VERSION: string = pjson.version;

export const NAME = 'Waddle Forever';

export const HTTP_PORT = 24105;

export const TIMELINE_UNLOCK_COST = 5000;

export const IS_DEV = process.env.NODE_ENV === 'dev';

export const WEBSITE = 'https://waddleforever.com';

export const GITHUB_REPO = 'redninja225-source/Waddle-Forever';
