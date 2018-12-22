const PREFIX = 'MYPLAYER';

export const ADD_MUSIC_MYPLAYLIST = `${PREFIX}/ADD_MUSIC_MYPLAYLIST`;
export const REMOVE_MUSIC_MYPLAYLIST = `${PREFIX}/REMOVE_MUSIC_MYPLAYLIST`;
export const SET_MYPLAYER_SUB_PLAYLIST = `${PREFIX}/SET_MYPLAYER_SUB_PLAYLIST`;

export function addMusicMyPlaylist(musicId) {
  return {
    type: ADD_MUSIC_MYPLAYLIST,
    musicId,
  };
}

export function removeMusicMyPlaylist(musicId) {
  return {
    type: REMOVE_MUSIC_MYPLAYLIST,
    musicId,
  };
}

export function setMyPlayerSubPlayList(list, name) {
  return {
    type: SET_MYPLAYER_SUB_PLAYLIST,
    list,
    name,
  };
}
