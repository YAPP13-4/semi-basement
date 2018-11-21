import React, { PureComponent } from "react"
import classnames from "classnames/bind"
import css from "./NavBar.scss"

const cx = classnames.bind(css)
const moduleName = "NavBar"
export default class NavBar extends PureComponent {
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        {/*일시적 처리. 나중에 좀더 깔끔히! */}

        <div
          onClick={() => {
            this.props.handleShowResultChange("All")
          }}
        >
          All
        </div>
        <div
          onClick={() => {
            this.props.handleShowResultChange("user.username")
          }}
        >
          Artist
        </div>
        <div
          onClick={() => {
            this.props.handleShowResultChange("title")
          }}
        >
          Title
        </div>
      </div>
    )
  }
}
