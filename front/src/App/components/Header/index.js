import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { Link } from "react-router-dom"
import classnames from "classnames/bind"
import { toggleMyplayer, toggleGNB } from "src/redux/meta/actions.js"
import logo from "src/assets/logos/logo.png"
import css from "./index.scss"

const cx = classnames.bind(css)
const moduleName = "Header"
class Header extends Component {
  render() {
    return (
      <Fragment>
        <header
          className={cx(`${moduleName}`)}
          style={{
            backgroundColor: this.props.pathname === "/" ? "none" : "#000000"
          }}
        >
          <div className={cx(`${moduleName}-menu`)}>
            <span onClick={this.props.toggleGNB} />
          </div>
          <div className={cx(`${moduleName}-logo`)}>
            <img src={logo} alt="logo" />
          </div>
          <div className={cx(`${moduleName}-rightSide`)}>
            <div className={cx(`${moduleName}-rightSide-user`)}>
              {/* sing up, sign in btn  a tag must be Link!!!*/}
              {/* FIX ME ..... */}
              <Link to="/sign">
                <span className={cx(`${moduleName}-rightSide-user-signIn`)}>
                  Sign In
                </span>
              </Link>
              <Link to="/sign">
                <span
                  style={{
                    backgroundColor: "#45f7aa",
                    color: "#020202",
                    border: "none"
                  }}
                >
                  Sign Up
                </span>
              </Link>
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
      </Fragment>
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
