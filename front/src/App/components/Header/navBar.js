import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { toggleGNB } from "../../.././redux/meta/actions"
import { connect } from "react-redux"
import classnames from "classnames/bind"
import css from "./navBar.scss"
const cx = classnames.bind(css)
const moduleName = "GNB"

class NavBar extends Component {
  render() {
    return (
      <div
        style={{ display: this.props.showGNB ? "block" : "none" }}
        className={cx(`${moduleName}`)}
      >
        <div className={cx(`${moduleName}-wrapper`)}>
          <div className={cx(`${moduleName}-top`)}>
            <span onClick={this.props.toggleGNB} />
          </div>
          <div className={cx(`${moduleName}-body`)}>
            {/*TODO : Replace Link */}
            <div>HOME</div>
            <div>MY PAGE</div>
            <div>ABOUT US</div>
            <div>CONTACT</div>
          </div>
          <div className={cx(`${moduleName}-bottom`)}>LOGOUT</div>
        </div>
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleGNB }, dispatch)
}
function mapStateToProps(state) {
  return { showGNB: state.meta.showGNB }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)
