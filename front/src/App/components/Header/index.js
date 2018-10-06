import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import classnames from 'classnames/bind'
import logo from '../../../assets/logos/logo.png'
import google from '../../../assets/icons/google.png'
import facebook from '../../../assets/icons/facebook.png'
import twitter from '../../../assets/icons/twitter.png'

import css from './index.scss'
import Popup from "reactjs-popup";

const cx = classnames.bind(css)
const moduleName = 'Header'

class Header extends React.Component {
  render() {
    return (
      <header
        className={cx(`${moduleName}`)}
        style={{
          backgroundColor: this.props.pathname === '/' ? 'none' : '#000000'
        }}
      >
        <div className={cx(`${moduleName}-menu`)}>
          <span>

          </span>
        </div>
        <div className={cx(`${moduleName}-logo`)}>
            <img src={logo} alt="logo" />
        </div>
        <div className={cx(`${moduleName}-rightSide`)}>
          
          <div className={cx(`${moduleName}-rightSide-user`)}>
            {/* sing up, sign in btn  a tag must be Link!!!*/}
            
            </div>
            <button className={cx(`${moduleName}-button-signIn`)}>sign In</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Popup trigger={<button className={cx(`${moduleName}-button-signUp`)}>sign Up</button>} modal>
              {close => (
                <div className={cx(`${moduleName}-modal`)}>
                     <a className={cx(`${moduleName}-modal-close`)} onClick={close}>
                        &times;
                      </a>
                    <div className={cx(`${moduleName}-modal-title`)}> Welcome semibasement! </div>
                    <br></br><br></br><br></br>
                    <div className={cx(`${moduleName}-modal-content`)}>
                    <button className={cx(`${moduleName}-modal-content-login`)}>
                    <img style={{marginright: 20}} src={google} alt="google" />
                    Continue with google</button>
                    <br></br> <br></br> <br></br>
                    <hr/>
                    <br></br><br></br>
                    <button className={cx(`${moduleName}-modal-content-login2`)}>
                    <img src={facebook} alt="facebook" />
                    Continue with Facebook</button>
                    <br></br> <br></br>
                    <button className={cx(`${moduleName}-modal-content-login2`)}>
                    <img src={twitter} alt="twitter" />
                    Continue with Twitter</button>
                    <br></br><br></br><br></br>
                      
                    </div>
                   
                  </div>
               )}
             </Popup>
          

          <div className={cx(`${moduleName}-rightSide-playlist`)}>
            <span></span>
          </div>

        </div>
      </header>
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
)(Header)


