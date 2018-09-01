import React, { Component } from 'react'

import classnames from 'classnames/bind'
import css from './index.scss'

import menuIcon from '../../../assets/icons/menu.png'
import logo from '../../../assets/logos/logo.png'
import profile from '../../../assets/icons/profile_dummy.png'
const cx = classnames.bind(css)
const moduleName = 'Header'

class Header extends Component {
  render() {
    return (
      <header className={cx(`${moduleName}`)}>
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
            <img src={menuIcon} alt="menuIcon" style= {{position : 'absolute' ,right : '0'}}/>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
