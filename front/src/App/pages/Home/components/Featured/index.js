import React, { PureComponent } from "react"
import classnames from "classnames/bind"

import css from "./index.scss"

const cx = classnames.bind(css)
const moduleName = "Featured"

class Featured extends PureComponent {
  render() {
    return <div className={cx(`${moduleName}`)}>Featured!</div>
  }
}

export default Featured
