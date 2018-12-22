import {
  LOAD_CHART_MUSIC_INFO_REQUEST,
  LOAD_CHART_MUSIC_INFO_SUCCESS,
  LOAD_CHART_MUSIC_INFO_FAILURE
} from "./actions"

const chartMusic = (
  state = {
    loading: false,
    musicInfo: null,
    err: null
  },
  action
) => {
  switch (action.type) {
    case LOAD_CHART_MUSIC_INFO_REQUEST:
      return {
        ...state,
        loading: true
      }
    case LOAD_CHART_MUSIC_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        musicInfo: [...action.data]
      }
    case LOAD_CHART_MUSIC_INFO_FAILURE:
      return {
        ...state,
        err: [...action.err]
      }
    default:
      return state
  }
}
export default chartMusic
