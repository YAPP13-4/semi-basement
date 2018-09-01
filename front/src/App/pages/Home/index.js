import React, { Component } from 'react'

import classnames from 'classnames/bind'
import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'Home'

class Home extends Component {
  render() {
    return <div className={cx(`${moduleName}`)}>Home이야</div>
  }
} 

export default Home;