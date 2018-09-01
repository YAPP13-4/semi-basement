import React, { Component } from 'react'

import classnames from 'classnames/bind'
import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'Mypage'

class Mypage extends Component {
  render() {
    return <div className={cx(`${moduleName}`)}>Mypage이야</div>
  }
} 

export default Mypage;