import { Update } from ".";
import { UPDATES_2015_PARTIES } from "./party-2015";
import { mergeIssueUpdates, NEWSPAPER_ISSUES_2015 } from "./newspaper-issues";

const BASE_UPDATES_2015: Update[] = [
  {
    date: '2015-05-01',
    rooms: {
      dojo: 'archives:RoomsDojo-May2015.swf',
      lake: 'archives:RoomsLake-May2015.swf',
      school: 'archives:RoomsSchool-May2015.swf'
    }
  }
];

export const UPDATES_2015: Update[] = mergeIssueUpdates(
  [...BASE_UPDATES_2015, ...UPDATES_2015_PARTIES],
  NEWSPAPER_ISSUES_2015
);
