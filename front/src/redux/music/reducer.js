import * as types from "./ActionType"

import {
  LOAD_SONG_DETAIL_REQUEST,
  LOAD_SONG_DETAIL_SUCCESS,
  LOAD_SONG_DETAIL_FAILURE,
  LOAD_SONG_INFO_REQUEST,
  LOAD_SONG_INFO_SUCCESS,
  LOAD_SONG_INFO_FAILURE
} from "./actions"

const music = (
  state = {
    song: "",
    loading: false,
    songDetail: null,
    historySong: null
  },
  action
) => {
  switch (action.type) {
    case LOAD_SONG_INFO_SUCCESS:
      return {
        ...state,
        musicInfo: { ...action.data }
      }
    case types.SELECT_SONG:
      return {
        ...state,
        song: action.song
      }
    case types.HISTORY_SONG:
      return {
        ...state,
        historySong: action.historySong
      }
    case LOAD_SONG_DETAIL_REQUEST:
      return {
        ...state,
        loading: true
      }
    case LOAD_SONG_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        songDetail: { ...action.data }
      }
    case LOAD_SONG_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: { ...action.err }
      }
    default:
      return state
  }
}

export default music
