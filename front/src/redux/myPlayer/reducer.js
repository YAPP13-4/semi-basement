import { SWITCH_PLAYLIST, SET_MYPLAYER_SUB_PLAYLIST } from './actions'

const myPlayer = (
  state = {
    isMyPlayListSelected: true,
    isTopicPlayListSelected: false,
    subPlayList: [
      412411770,
      412411872,
      331622174,
      237472634,
      197769251,
      277971445
    ],
    subPlayListName: "SEBA'S CHOICE"
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
    case SET_MYPLAYER_SUB_PLAYLIST:
      return {
        ...state,
        subPlayList: [...action.list],
        subPlayListName: action.name
      }
    default:
      return state
  }
}

export default myPlayer
