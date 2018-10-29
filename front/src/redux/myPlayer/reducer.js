import { SWITCH_PLAYLIST } from './actions'

const myPlayer = (
  state = {
    isMyPlayListSelected: true,
    isTopicPlayListSelected: false
  },
  action
) => {
  switch (action.type) {
    case SWITCH_PLAYLIST:
      return {
        ...state,
        isMyPlayListSelected: !state.isMyPlayListSelected,
        isTopicPlayListSelected: !state.isTopicPlayListSelected
      }
    default:
      return state
  }
}

export default myPlayer
