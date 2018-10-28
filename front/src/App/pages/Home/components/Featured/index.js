import React, { PureComponent } from "react"
import classnames from "classnames/bind"
import FeaturedComponent from "./FeatureComponent"
import css from "./index.scss"

const cx = classnames.bind(css)
const moduleName = "Featured"

class Featured extends PureComponent {
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-top`)}>
          <div className={cx(`${moduleName}-top-inner`)}>
            <div className={cx(`${moduleName}-top-inner-left`)} />
            <div className={cx(`${moduleName}-top-inner-mid`)}>Featured</div>
            <div className={cx(`${moduleName}-top-inner-right`)} />
          </div>
        </div>
        <div className={cx(`${moduleName}-mid`)}>
          <div>
            <FeaturedComponent />
          </div>
          <div>
            <FeaturedComponent />
          </div>
          <div>
            <FeaturedComponent />
          </div>
          <div>
            <FeaturedComponent />
          </div>
          <div>
            <FeaturedComponent />
          </div>
          <div>
            <FeaturedComponent />
          </div>
          <div>
            <FeaturedComponent />
          </div>
        </div>
      </div>
    )
  }
}

export default Featured
