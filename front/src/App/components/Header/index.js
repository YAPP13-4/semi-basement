import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import classnames from "classnames/bind"
import SearchBar from "../SearchBar"
import { toggleMyplayer, toggleGNB } from "src/redux/meta/actions.js"
import logo from "src/assets/logos/logo.png"
import css from "./index.scss"

const cx = classnames.bind(css)
const moduleName = "Header"
class Header extends Component {
  render() {
    return (
      <div
        className={cx(`${moduleName}`)}
        style={{
          backgroundColor: this.props.pathname === "/" ? "none" : "#000000"
        }}
      >
        <header className={cx(`${moduleName}-inner`)}>
          <div className={cx(`${moduleName}-menu`)}>
            <span onClick={this.props.toggleGNB} />
          </div>
          <div className={cx(`${moduleName}-logo`)}>
            <img src={logo} alt="logo" />
          </div>
          <div className={cx(`${moduleName}-rightSide`)}>
            <div className={cx(`${moduleName}-rightSide-search`)}>
              <SearchBar />
            </div>
            <div
              className={cx(`${moduleName}-rightSide-playlist`)}
              onClick={() => {
                this.props.toggleMyplayer()
              }}
            >
              <span />
            </div>
          </div>
        </header>
      </div>
    )
  }
}

export default compose(
  connect(
    state => {
      const { router } = state
      return {
        pathname: router.location.pathname
      }
    },
    {
      toggleMyplayer,
      toggleGNB
    }
  )
)(Header)
