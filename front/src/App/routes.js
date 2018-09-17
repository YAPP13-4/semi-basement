import Home from './pages/Home'
import Mypage from './pages/Mypage'
import Sign from './pages/Sign'
import ChartTab from './pages/Home/Chart/ChartTab'
import Landing from './pages/Landing'
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
    component: ChartTab
  },
  {
    path: '/main',
    component: Home,
  },
  {
    path: '/',
    component: Landing,
  },
]

export default routes;