import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import classnames from 'classnames/bind'

import menuIcon from '../../../assets/icons/menu.png'
import logo from '../../../assets/logos/logo.png'
import profile from '../../../assets/icons/profile_dummy.png'
import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'Header'
class Header extends Component {
  render() {
    return (
      <header
        className={cx(`${moduleName}`)}
        style={{
          backgroundColor: this.props.pathname === '/' ? 'none' : '#000000'
        }}
      >
        <div className={cx(`${moduleName}-menu`)}>
          <img src={menuIcon} alt="menuIcon" />
        </div>
        <div className={cx(`${moduleName}-logo`)}>
            <img src={logo} alt="logo" />
        </div>
        <div className={cx(`${moduleName}-rightSide`)}>
          <div className={cx(`${moduleName}-rightSide-user`)}>
            <div>
              <img
                src={profile}
                alt="profile"
                className={cx(`${moduleName}-rightSide-user-image`)}
              />
            </div>
            <div className={cx(`${moduleName}-rightSide-user-name`)}>
              userName >{' '}
            </div>
          </div>
          <div className={cx(`${moduleName}-rightSide-playlist`)}>
            <img
              src={menuIcon}
              alt="menuIcon"
              style={{ position: 'absolute' }}
            />
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
