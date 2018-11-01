const MODULE_NAME = `MYPLAYER`

export const ADD_SONG_MYPLAYLIST = `${MODULE_NAME}/ADD_SONG_MYPLAYLIST`
export const REMOVE_SONG_MYPLAYLIST = `${MODULE_NAME}/REMOVE_SONG_MYPLAYLIST`
export const SET_MYPLAYER_SUB_PLAYLIST = `${MODULE_NAME}/SET_MYPLAYER_SUB_PLAYLIST`

export function addSongMyPlaylist(songId) {
  return {
    type: ADD_SONG_MYPLAYLIST,
    songId
  }
}

export function removeSongMyPlaylist(songId) {
  return {
    type: REMOVE_SONG_MYPLAYLIST,
    songId
  }
}

export function setMyPlayerSubPlayList(list,name) {
  return {
    type: SET_MYPLAYER_SUB_PLAYLIST,
    list,
    name
  }
}