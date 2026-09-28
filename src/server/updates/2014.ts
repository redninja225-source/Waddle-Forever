import { Update } from ".";
import { UPDATES_2014_PARTIES } from "./party-2014";
import { mergeIssueUpdates, NEWSPAPER_ISSUES_2014 } from "./newspaper-issues";

const BASE_UPDATES_2014: Update[] = [
  {
    date: '2014-01-02',
    end: ['party']
  },
  {
    date: '2014-05-14',
    rooms: {
      lake: 'archives:RoomsLake-May2014.swf',
      underwater: 'archives:RoomsUnderwater-21April2015.swf'
    },
    music: {
      lake: 666,
      underwater: 671
    }
  },
  {
    date: '2014-06-01',
    dateReference: 'vr-room'
  }
];

export const UPDATES_2014: Update[] = mergeIssueUpdates(
  [...BASE_UPDATES_2014, ...UPDATES_2014_PARTIES],
  NEWSPAPER_ISSUES_2014
);
