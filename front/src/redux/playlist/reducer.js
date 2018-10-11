import * as types from "./ActionType"
const initialState = {
  playlist: null
}

const playList = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_NEW_LIST:
      return {
        ...state,
        musicList: action.playlist
      }
    default:
      return state
  }
}

export default playList
