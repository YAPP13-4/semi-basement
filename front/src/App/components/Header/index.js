import React, { Component } from 'react'

import classnames from 'classnames/bind'
import css from './index.scss'

import menuIcon from '../../../assets/icons/menu.png'
import logo from '../../../assets/logos/logo.png'

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
            <span className={cx(`${moduleName}-rightSide-user-image`)}></span>
            <span>userName</span>
            <span>></span>
          </div>
          <div className={cx(`${moduleName}-rightSide-playlist`)}>playlist</div>
        </div>
      </header>
    )
  }
}

export default Header
