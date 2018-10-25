import React, { Component } from "react"

import classnames from "classnames/bind"
import css from "./index.scss"
import ChartTab from "../Home/Chart/ChartTab"
const cx = classnames.bind(css)
const moduleName = "Mypage"

class Mypage extends Component {
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-myinfo`)}>
          <div className={cx(`${moduleName}-myinfo-wrapper`)}>
            <div className={cx(`${moduleName}-myinfo-wrapper-img`)}>image</div>
            <div className={cx(`${moduleName}-myinfo-wrapper-name`)}>
              <span>Name</span>
            </div>
          </div>
        </div>
        <div className={cx(`${moduleName}-chart`)}>
          <div className={cx(`${moduleName}-chart-nav`)}>
            <div>Discover</div>
            <div>Playlist</div>
            <div>liked</div>
          </div>
          <ChartTab />
        </div>
      </div>
    )
  }
}

export default Mypage
