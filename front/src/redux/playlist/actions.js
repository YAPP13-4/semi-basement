import * as types from './ActionType'

export const changePlayList = (playlist, currentList) => {
  return {
    type: types.LOAD_NEW_LIST,
    playlist,
    currentList
  }
}
