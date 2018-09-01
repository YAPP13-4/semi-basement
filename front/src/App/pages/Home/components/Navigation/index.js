import React, { Component } from 'react'

import classnames from 'classnames/bind'
import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'Navigation'

class Navigation extends Component {
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-rightBox`)}>
          <div>Discover</div>
          <div>Chart</div>
          <div>Recent</div>
        </div>
        <div className={cx(`${moduleName}-leftBox`)}>
          <div>
            <i className="material-icons">search</i>
            <input placeholder={'Type something'} />
          </div>
        </div>
      </div>
    )
  }
}

export default Navigation
