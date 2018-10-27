import {
  SELECT_SONG,
  HISTORY_SONG_REQUEST,
  HISTORY_SONG_SUCCESS,
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
    infoLoading: false,
    musicInfo: null,
    recommendMusicInfo1: null,
    recommendMusicInfo2: null,
    songDetail: null,
    historySong: []
  },
  action
) => {
  switch (action.type) {
    case LOAD_SONG_INFO_REQUEST:
      return {
        ...state,
        infoLoading: true
      }

    case LOAD_SONG_INFO_SUCCESS:
      return {
        ...state,
        infoLoading: false,
        musicInfo: [...action.data]
      }
    case SELECT_SONG:
      return {
        ...state,
        song: action.song
      }
    case HISTORY_SONG_REQUEST:
      return {
        ...state
      }
    case HISTORY_SONG_SUCCESS:
      return {
        ...state,
        historySong: [...action.data]
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
