import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind'
import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'Navigation'

class Navigation extends Component {
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-rightBox`)}>
          <div><Link to ="/main">Discover</Link></div>
          <div><Link to ="/chart">Chart</Link></div>
          <div><Link to ="/recent">Recent</Link></div>
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
