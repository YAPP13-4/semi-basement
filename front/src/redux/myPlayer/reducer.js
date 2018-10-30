import { ADD_SONG_MYPLAYLIST, SET_MYPLAYER_SUB_PLAYLIST } from './actions'

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
    subPlayListName: "SEBA'S CHOICE"
  },
  action
) => {
  switch (action.type) {
    case ADD_SONG_MYPLAYLIST:
      // 임시 방편이다. 백엔드와 연동되고 나면, saga를 통해 api로 DB에 저장할것.
      const myPlayList = JSON.parse(localStorage.getItem('myPlayList'))
      const reducer = (acc, v) => {
        if (isNotContain(acc, v)) acc.push(v)
        return acc
      }
      const isNotContain = (arr, v) => arr.indexOf(v) < 0
      const newMyPlayList = [...myPlayList, action.songId].reduce(reducer, [])
      localStorage.setItem('myPlayList', JSON.stringify(newMyPlayList))
      return {
        ...state
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
