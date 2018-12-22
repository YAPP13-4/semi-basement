import meta from "./meta/reducer"
import music from "./music/reducer"
import player from "./player/reducer"
import myPlayer from "./myPlayer/reducer"
import search from "./search/reducer"
import playList from "./playlist/reducer"
import chartMusic from "./chart/reducer"
import submusic1 from "./submusic1/reducer"

// 이는 바깥에서 combine 해준다.
export default {
  meta,
  music,
  player,
  myPlayer,
  search,
  playList,
  chartMusic,
  submusic1
}
