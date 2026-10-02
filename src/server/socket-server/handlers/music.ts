import { PenguinHandler } from "./handlers";

/** Handlers for the SoundStudio music service (play/v2/client/music/Music.swf), which sends 'musictrack' commands */

export const handleGetSharedTracks: PenguinHandler<[]> = ({ msg, penguin }) => {
  // no shared tracks; the second arg is the track list the client splits
  msg.send(penguin, 'getsharedmusictracks', 0, '');
}

export const handleRefreshTrackLikes: PenguinHandler<[]> = ({ msg, penguin }) => {
  msg.send(penguin, 'refreshmytracklikes', '');
}

export const handleGetTrackLikes: PenguinHandler<[number, number]> = ({ msg, penguin }, playerId) => {
  // the client reads the player id and like count at fixed positions
  msg.send(penguin, 'getlikecountfortrack', 0, playerId, 0);
}

export const handleLoadMusicTrack: PenguinHandler<[number, number]> = () => {
  // no saved tracks exist to load, and the client throws when the checksum validation fails,
  // so deliberately not sending a response
}

export const handleBroadcastMusicTracks: PenguinHandler<[]> = ({ msg, penguin }) => {
  // nobody is broadcasting a track in the room
  msg.send(penguin, 'broadcastingmusictracks');
}

export const handleSaveMusicTrack: PenguinHandler<[string, string, string]> = ({ msg, penguin }, _, songData) => {
  // tracks are not persisted; echo back so the save prompt resolves
  msg.send(penguin, 'savemymusictrack', songData);
}

export const handleDeleteMusicTrack: PenguinHandler<[string]> = ({ msg, penguin }, track) => {
  msg.send(penguin, 'deletetrack', track);
}

export const handleShareMusicTrack: PenguinHandler<[string, string]> = ({ msg, penguin }, songData) => {
  msg.send(penguin, 'sharemymusictrack', songData);
}
