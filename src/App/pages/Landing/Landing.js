import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { Link } from "react-router-dom"
import classnames from "classnames/bind"

import getIntoBtn from "src/assets/landing/get-into-button@2x.png"
import landingBgVideo from "src/assets/landing/video.mp4"

import css from "./Landing.scss"

const cx = classnames.bind(css)
const moduleName = "Landing"

class Landing extends PureComponent {
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
          <source src={landingBgVideo} type="video/mp4" />
        </video>
        <div className={cx(`${moduleName}-logoWrapper`)}>
          <div>
            <Link to="/main">
              <div>
                <img src={getIntoBtn} alt="mainBtn" />
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
