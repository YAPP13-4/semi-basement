const MODULE_NAME = `MYPLAYER`

export const ADD_PLAYLIST = `${MODULE_NAME}/ADD_PLAYLIST`
export const SWITCH_PLAYLIST = `${MODULE_NAME}/SWITCH_PLAYLIST`
export const SET_MYPLAYER_SUB_PLAYLIST = `${MODULE_NAME}/SET_MYPLAYER_SUB_PLAYLIST`

export function addPlaylist() {
  debugger
  return {
    type: ADD_PLAYLIST
  }
}

export function switchPlayList() {
  return {
    type: SWITCH_PLAYLIST
  }
}

export function setMyPlayerSubPlayList(list,name) {
  return {
    type: SET_MYPLAYER_SUB_PLAYLIST,
    list,
    name
  }
}