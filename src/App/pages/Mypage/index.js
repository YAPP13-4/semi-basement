import React, { PureComponent } from "react"

import classnames from "classnames/bind"
import css from "./index.scss"
import ChartTab from "../Home/Chart/ChartTab"
import MyChartNav from "./components/MyCharNav"
const cx = classnames.bind(css)
const moduleName = "Mypage"

class Mypage extends PureComponent {
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
          <MyChartNav />
          <ChartTab />
        </div>
      </div>
    )
  }
}

export default Mypage
