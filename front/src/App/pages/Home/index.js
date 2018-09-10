import React, { Component } from 'react'


import ArtworkPlay from './components/ArtworkPlay'

import classnames from 'classnames/bind'
import css from './index.scss'

import Navigation from './components/Navigation'

const cx = classnames.bind(css)
const moduleName = 'Home'

class Home extends Component {
  state = {}

  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <Navigation />
        <div className={cx(`${moduleName}-songWrapper`)}>
          <ArtworkPlay />
        </div>
      </div>
    )
  }
}

export default Home
