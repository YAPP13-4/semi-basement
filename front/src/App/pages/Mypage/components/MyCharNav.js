import React, { PureComponent } from "react"

import classnames from "classnames/bind"
import css from "./MyChartNav.scss"

const cx = classnames.bind(css)
const moduleName = "MyChartNav"

class MyChartNav extends PureComponent {
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-left`)}>
          <div>Discover</div>
          <div>Playlist</div>
          <div>liked</div>
        </div>
      </div>
    )
  }
}

export default MyChartNav
