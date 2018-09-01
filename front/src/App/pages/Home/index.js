import React, { Component } from 'react'

// mp3 files
import Billy from 'src/assets/thumbnail/Billy.jpg'
import Bryson from 'src/assets/thumbnail/Bryson Tiller - Canceled (prod By Hunga).jpg'
import No_Rest from 'src/assets/thumbnail/No Rest (Prod. by @Menohbeats).jpg'
import sheck_wes from 'src/assets/thumbnail/sheck wes - mo bamba (prod. 16yrold & take a daytrip).jpg'
import Walk from 'src/assets/thumbnail/Taking A Walk (Prod. Scott Storch).jpg'

import Song from './Song'

import classnames from 'classnames/bind'
import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'Home'

class Home extends Component {
  state = {}
  componentDidMount() {
    this._getSongThumbnail()
  }
  _getSongThumbnail = () => {
    const songsThumbnail = [Billy, Bryson, No_Rest, sheck_wes, Walk,sheck_wes]

    this.setState({
      songsThumbnail
    })
  }
  _renderSong = () => {
    const songs = this.state.songsThumbnail.map((img, index) => {
      return <Song thumbnail={img} singer="soyoung" title="Billy" mp3={'mp3'} />
    })
    return songs
  }
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-songWrapper`)}>
          {this.state.songsThumbnail ? this._renderSong() : 'Loading'}
        </div>
      </div>
    )
  }
}

export default Home
