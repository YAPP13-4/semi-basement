import Home from './pages/Home'
import Mypage from './pages/Mypage'
import Sign from './pages/Sign'

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
    path: '/',
    component: Home,
  },
]

export default routes;