import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { Link } from "react-router-dom"
import classnames from "classnames/bind"
import css from "./index.scss"

const cx = classnames.bind(css)
const moduleName = "Navigation"

class Navigation extends Component {
  render() {
    const paintingCurrentStyle = path => {
      if (this.props.pathname === `${path}`) return underStyle
    }

    const underStyle = {
      borderBottom: "2px solid #45f7aa"
    }
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-rightBox`)}>
          <div style={paintingCurrentStyle("/main")}>
            <Link to="/main">Discover</Link>
          </div>
          <div style={paintingCurrentStyle("/chart")}>
            <Link to="/chart">Chart</Link>
          </div>
          <div>
            <Link to="/recent">Recent</Link>
          </div>
        </div>
        {/*FIXME : 홈에 searchBar가 있어야 할 이유가 없다면, 제거할것. */}
        {/*
        <div className={cx(`${moduleName}-leftBox`)}>
          <div>
            <i className="material-icons">search</i>
            <input placeholder={"Type something"} />
          </div>
        </div>
        */}
      </div>
    )
  }
}

export default compose(
  connect(state => {
    const { router } = state
    return {
      pathname: router.location.pathname
    }
  })
)(Navigation)
