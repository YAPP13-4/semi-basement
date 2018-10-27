import Home from "./pages/Home"
import Mypage from "./pages/Mypage"
import Sign from "./pages/Sign"

import ChartTabPage from "./pages/Home/Chart/ChartTabPage"
import Landing from "./pages/Landing"
import SongDetail from "./pages/SongDetail"
import SongRegist from "./pages/SongRegister"
const routes = [
  {
    path: "/mypage",
    exact: true,
    component: Mypage
  },
  {
    path: "/sign",
    exact: true,
    component: Sign
  },
  {
    path: "/chart",
    component: ChartTabPage
  },
  {
    path: "/main",
    component: Home
  },
  {
    path: "/songDetail/:songId",
    component: SongDetail
  },
  {
    path: "/regSong",
    component: SongRegist
  },
  {
    path: "/",
    component: Landing
  }
]

export default routes
