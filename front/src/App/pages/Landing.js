import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { Link } from "react-router-dom"

import classnames from "classnames/bind"
import css from "./Landing.scss"
import landingBtn from "../../assets/get-into-button@2x.png"
import landingtitle from "../../assets/video.mp4"
// import { landing } from '../../actions/index'

const cx = classnames.bind(css)
const moduleName = "Landing"

class Landing extends Component {
  constructor(props) {
    super(props)

    this.state = { term: 1 }
    console.log("constructor state : " + this.state.term)
    this._getInto = this._getInto.bind(this)
    // this.props.landing(this.state.term)
  }
  _getInto(event) {
    event.preventDefault()
    this.setState({
      term: 0
    })
    console.log("_getInto : " + this.state.term)
    // this.props.landing(this.state.term)
  }

  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <video
          autoPlay
          muted
          loop
          className={cx(`${moduleName}-glitch__img`)}
          style={{ objectFit: "cover" }}
        >
          <source src={landingtitle} type="video/mp4" />
        </video>
        <div className={cx(`${moduleName}-logoWrapper`)}>
          <div onClick={this._getInto}>
            <Link to="/main">
              <div>
                <img src={landingBtn} alt="mainBtn" />
              </div>
            </Link>
          </div>
        </div>
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
)(Landing)
