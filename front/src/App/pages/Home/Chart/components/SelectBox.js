import React, { PureComponent } from "react"
import classnames from "classnames/bind"
import css from "./SelectBox.scss"
const cx = classnames.bind(css)
const moduleName = "SelectBox"
class SelectBox extends PureComponent {
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div />
        <div>
          <select>
            <option value="Top50">Top 50</option>
          </select>
        </div>
      </div>
    )
  }
}

export default SelectBox
