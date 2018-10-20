import * as types from "./ActionType"
const initialState = {
  musicList: null,
  currentList: null
}

const playList = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_NEW_LIST:
      return {
        ...state,
        musicList: action.playlist,
        currentList: action.currentList
      }
    default:
      return state
  }
}

export default playList
