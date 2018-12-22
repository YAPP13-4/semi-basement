const PREFIX = 'MYPLAYER';

export const ADD_SONG_MYPLAYLIST = `${PREFIX}/ADD_SONG_MYPLAYLIST`;
export const REMOVE_SONG_MYPLAYLIST = `${PREFIX}/REMOVE_SONG_MYPLAYLIST`;
export const SET_MYPLAYER_SUB_PLAYLIST = `${PREFIX}/SET_MYPLAYER_SUB_PLAYLIST`;

export function addSongMyPlaylist(songId) {
  return {
    type: ADD_SONG_MYPLAYLIST,
    songId,
  };
}

export function removeSongMyPlaylist(songId) {
  return {
    type: REMOVE_SONG_MYPLAYLIST,
    songId,
  };
}

export function setMyPlayerSubPlayList(list, name) {
  return {
    type: SET_MYPLAYER_SUB_PLAYLIST,
    list,
    name,
  };
}
