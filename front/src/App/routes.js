import Home from './pages/Home'
import Mypage from './pages/Mypage'
import Sign from './pages/Sign'
import ChartTab from './pages/Home/Chart/ChartTab'
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
    path: '/',
    component: Home,
  },

]

export default routes;