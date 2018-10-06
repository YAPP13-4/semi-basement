import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import classnames from "classnames/bind"
import logo from "../../../assets/logos/logo.png"
import { toggleGNB } from "../../.././redux/meta/actions"

//TODO : Delete
import google from "../../../assets/icons/google.png"
import facebook from "../../../assets/icons/facebook.png"
import twitter from "../../../assets/icons/twitter.png"

import css from "./index.scss"
import Popup from "../../../reactjs-popup"
//import Popup from "../../../../node_modules/reactjs-popup"

const cx = classnames.bind(css)
const moduleName = "Header"

class Header extends React.Component {
  render() {
    return (
      <header
        className={cx(`${moduleName}`)}
        style={{
          backgroundColor: this.props.pathname === "/" ? "none" : "#000000"
        }}
      >
        <div className={cx(`${moduleName}-menu`)}>
          <button
            className={cx(`${moduleName}-button-gnb`)}
            onClick={this.props.toggleGNB}
          >
            <span />
          </button>
        </div>
        {/*}
          <Popup
            trigger={

            }
            modal2
          >
            {close => (
              <div className={cx(`${moduleName}-modal2`)}>
                <a className={cx(`${moduleName}-modal2-close`)} onClick={close}>
                  &times;
                </a>
                <br />
                <div className={cx(`${moduleName}-modal2-content`)}>
                  <p className={cx(`${moduleName}-line`)}>HOME</p>
                  MY PAGE <br />
                  ABOUT US <br />
                  CONTACT <br />
                  <br /> <br /> <br />
                  LOGOUT
                </div>
              </div>
            )}
          </Popup>
            */}

        <div className={cx(`${moduleName}-logo`)}>
          <img src={logo} alt="logo" />
        </div>
        <div className={cx(`${moduleName}-rightSide`)}>
          <div className={cx(`${moduleName}-rightSide-user`)}>
            {/* sing up, sign in btn  a tag must be Link!!!*/}
          </div>
          <button className={cx(`${moduleName}-button-signIn`)}>sign In</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Popup
            trigger={
              <button className={cx(`${moduleName}-button-signUp`)}>
                sign Up
              </button>
            }
            modal
          >
            {close => (
              <div className={cx(`${moduleName}-modal`)}>
                <a className={cx(`${moduleName}-modal-close`)} onClick={close}>
                  &times;
                </a>
                <div className={cx(`${moduleName}-modal-title`)}>
                  {" "}
                  Welcome semibasement!{" "}
                </div>
                <br />
                <br />
                <br />
                <div className={cx(`${moduleName}-modal-content`)}>
                  <button className={cx(`${moduleName}-modal-content-login`)}>
                    <img
                      style={{ float: "left", marginLeft: 10 }}
                      src={google}
                      alt="google"
                    />
                    Continue with google
                  </button>
                  <br /> <br /> <br />
                  <hr />
                  <br />
                  <br />
                  <button className={cx(`${moduleName}-modal-content-login2`)}>
                    <img
                      style={{ float: "left", marginLeft: 10 }}
                      src={facebook}
                      alt="facebook"
                    />
                    Continue with Facebook
                  </button>
                  <br /> <br />
                  <button className={cx(`${moduleName}-modal-content-login2`)}>
                    <img
                      style={{ float: "left", marginLeft: 10 }}
                      src={twitter}
                      alt="twitter"
                    />
                    Continue with Twitter
                  </button>
                  <br />
                  <br />
                  <br />
                </div>
              </div>
            )}
          </Popup>
          <div className={cx(`${moduleName}-rightSide-playlist`)}>
            <span />
          </div>
        </div>
      </header>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleGNB }, dispatch)
}
export default connect(
  state => {
    const { router } = state
    return {
      pathname: router.location.pathname
    }
  },
  mapDispatchToProps
)(Header)
