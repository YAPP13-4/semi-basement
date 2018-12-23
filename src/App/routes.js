import Home from './pages/Home';
import Mypage from './pages/Mypage';
import Sign from './pages/Sign';

import ChartTabPage from './pages/Home/Chart/ChartTabPage';
import Landing from './pages/Landing';
import MusicDetail from './pages/MusicDetail';
import MusicRegist from './pages/MusicRegister';
import SearchResult from './pages/SearchResult';
const routes = [
  {
    path: '/mypage',
    exact: true,
    component: Mypage,
  },
  {
    path: '/sign',
    exact: true,
    component: Sign,
  },
  {
    path: '/chart',
    component: ChartTabPage,
  },
  {
    path: '/main',
    component: Home,
  },
  {
    path: '/musicDetail/:musicId',
    component: MusicDetail,
  },
  {
    path: '/regMusic',
    component: MusicRegist,
  },
  {
    path: '/search/:keyword',
    component: SearchResult,
  },
  {
    path: '/',
    component: Landing,
  },
];

export default routes;
