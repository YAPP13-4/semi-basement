import {
  EXAMPLE_REQUEST,
  EXAMPLE_SUCCESS,
  EXAMPLE_FAILURE,
  TOGGLE_HISTORY,
  TOGGLE_MYPLAYER,
  SHOW_GNB
} from './actions'

const meta = (
  state = {
    loading: false,
    data: null,
    error: null,
    toggleHistory: false,
    showMyplayer: false,
    showBottomplayer: true,
    showGNB: false
  },
  action
) => {
  switch (action.type) {
    case EXAMPLE_REQUEST:
      return {
        ...state,
        loading: true
      }

    case EXAMPLE_SUCCESS:
      return {
        loading: false,
        error: null,
        data: { ...action.data }
      }

    case EXAMPLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: { ...action.error }
      }
    case TOGGLE_HISTORY:
      return {
        ...state,
        toggleHistory: !state.toggleHistory
      }
    case TOGGLE_MYPLAYER:
      return {
        ...state,
        showMyplayer: !state.showMyplayer,
        showBottomplayer: !state.showBottomplayer
      }
    case SHOW_GNB:
      return {
        ...state,
        showGNB: !state.showGNB
      }
    default:
      return state
  }
}

export default meta
