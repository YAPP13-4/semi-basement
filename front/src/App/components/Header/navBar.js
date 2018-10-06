import React, { Component } from "react"
import classnames from "classnames/bind"
import css from "./navBar.scss"
const cx = classnames.bind(css)
const moduleName = "GNB"

class navBar extends Component {
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-top`)}>X</div>
        <div className={cx(`${moduleName}-body`)}>
          {/*TODO : Replace Link */}
          <div>HOME</div>
          <div>MY PAGE</div>
          <div>ABOUT US</div>
          <div>CONTACT</div>
        </div>
        <div className={cx(`${moduleName}-bottom`)}>LOGOUT</div>
      </div>
    )
  }
}
