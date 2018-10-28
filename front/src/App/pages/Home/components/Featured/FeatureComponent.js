import React, { PureComponent } from "react"
import classnames from "classnames/bind"

import css from "./FeaturedComponent.scss"

const cx = classnames.bind(css)
const moduleName = "FeaturedComponent"

class FeaturedComponent extends PureComponent {
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-mid`)}>icon</div>
        <div className={cx(`${moduleName}-bot`)}>Feat</div>
      </div>
    )
  }
}

export default FeaturedComponent
