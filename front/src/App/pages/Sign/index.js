import React, { Component } from 'react'

import classnames from 'classnames/bind'
import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'Sign'

class Sign extends Component {
  render() {
    return <div className={cx(`${moduleName}`)}>Sign이야</div>
  }
} 

export default Sign;