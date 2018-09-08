import React, { Component } from 'react'
import {connect} from 'react-redux' 
import classnames from 'classnames/bind'

import menuIcon from '../../../assets/icons/menu.png'
import logo from '../../../assets/logos/logo.png'
import profile from '../../../assets/icons/profile_dummy.png'
import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'Header'; 
class Header extends Component {
  render() {
    return (
      <header className={cx(`${moduleName}`)} style={ { backgroundColor : this.props.landing_state==0 ? '#000000' : 'none'} } >
        <div className={cx(`${moduleName}-menu`)}>
          <img src={menuIcon} alt="menuIcon" />
        </div>
        <div className={cx(`${moduleName}-logo`)}>
          <img src={logo} alt="logo" />
        </div>
        <div className={cx(`${moduleName}-rightSide`)}>
          <div className={cx(`${moduleName}-rightSide-user`)}>
            <div>
              <img src={profile} alt="profile" className={cx(`${moduleName}-rightSide-user-image`)}></img>
            </div>
            <div className={cx(`${moduleName}-rightSide-user-name`)}>userName    >  </div>

          </div>
          <div className={cx(`${moduleName}-rightSide-playlist`)}>
            <img src={menuIcon} alt="menuIcon" style= {{position : 'absolute'}}/>
          </div>
        </div>
      </header>
    )
  }
}
function mapStateToProps({landing_state}) {
  return { landing_state : landing_state}
} 
export default connect(mapStateToProps)(Header)
