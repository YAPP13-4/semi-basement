import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import classnames from 'classnames/bind'
import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'Home'

class Home extends Component {
  render() {
    return (
      <div style={{ color: '#ffffff' }}>
        <div>
          <Link to="/discover">Discover</Link>
        </div>
        <div>
          <Link to="/chart">Chart</Link>
        </div>
        <div>
          <Link to="/recent">Recent</Link>
        </div>
      </div>
    )
  }
}

export default Home
