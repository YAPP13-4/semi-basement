import * as myPlayerActions from "./actions"
const myPlayer = (
  state = {
    subPlayList: [
      412411770,
      412411872,
      331622174,
      237472634,
      197769251,
      277971445
    ],
    subPlayListName: "seba's choice"
  },
  action
) => {
  switch (action.type) {
    case myPlayerActions.ADD_MUSIC_MYPLAYLIST:
      // 임시 방편이다. 백엔드와 연동되고 나면, saga를 통해 api로 DB에 저장할것.
      const myPlayList = JSON.parse(localStorage.getItem('myPlayList')) || []
      const reducer = (acc, v) => {
        if (isNotContain(acc, v)) acc.push(v)
        return acc
      }
      const isNotContain = (arr, v) => arr.indexOf(v) < 0
      const newMyPlayList = [...myPlayList, action.musicId].reduce(reducer, [])
      localStorage.setItem('myPlayList', JSON.stringify(newMyPlayList))
      return {
        ...state
      }
    case myPlayerActions.REMOVE_MUSIC_MYPLAYLIST:
      const myPlayList2 = JSON.parse(localStorage.getItem('myPlayList')) || []
      const filteredMyPlayList = myPlayList2.filter(musicId => musicId !== action.musicId)
      localStorage.setItem('myPlayList', JSON.stringify(filteredMyPlayList))
      return {
        ...state
      }
    case myPlayerActions.SET_MYPLAYER_SUB_PLAYLIST:
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
