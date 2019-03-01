import meta from './meta/reducer';
import music from './music/reducer';
import player from './player/reducer';
import myPlayer from './myPlayer/reducer';
import search from './search/reducer';
import playList from './playlist/reducer';
import chartMusic from './chart/reducer';
import unsplashInfo from './unsplash/reducer';
import register from './register/reducer';
import user from './user/reducer';
// 이는 바깥에서 combine 해준다.
export default {
  meta,
  music,
  player,
  myPlayer,
  search,
  playList,
  chartMusic,
  unsplashInfo,
  register,
  user,
};
