import React, { PureComponent } from "react"
import { Link } from "react-router-dom"
import classnames from "classnames/bind"
import css from "./MyChartNav.scss"

const cx = classnames.bind(css)
const moduleName = "MyChartNav"

class MyChartNav extends PureComponent {
  render() {
    const underStyle = {
      borderBottom: "2px solid #45f7aa"
    }
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-left`)}>
          <div>Discover</div>
          <div>Playlist</div>
          <div>liked</div>
          <div>
            <Link to="/regSong"> AddTrack </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default MyChartNav
