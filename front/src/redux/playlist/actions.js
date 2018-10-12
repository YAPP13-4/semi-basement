import * as types from "./ActionType"

export const changePlayList = playlist => ({
  type: types.LOAD_NEW_LIST,
  playlist
})
