import React, { Component } from 'react'

import classnames from 'classnames/bind'
import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'Header'

class Header extends Component {
  render() {
    return <div className={cx(`${moduleName}`)}>
      <header>Semi<br/>Basement</header>
    </div>
  }
} 

export default Header;