import React, { Component } from 'react'


// mp3 files
import Billy from 'src/assets/mp3/Billy.mp3';
import Bryson from 'src/assets/mp3/Bryson Tiller - Canceled (prod By Hunga).mp3';
import No_Rest from 'src/assets/mp3/No Rest (Prod. by @Menohbeats).mp3';
import sheck_wes from 'src/assets/mp3/sheck wes - mo bamba (prod. 16yrold & take a daytrip).mp3'
import Walk from 'src/assets/mp3/Taking A Walk (Prod. Scott Storch).mp3'
import BillyThumbnail from 'src/assets/thumbnail/Billy.jpg'

import Song from './Song'


import classnames from 'classnames/bind'
import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'Home'

class Home extends Component {
  state = {}
  componentDidMount() {
    this._getSong();
  }
  _getSong = () => {
    const songs = [Billy, Bryson, No_Rest, sheck_wes, Walk]
    console.log(songs);
    this.setState({
      songs
    })
  }
  _renderSong = () => {
    const songs = this.state.songs.map((mp3, index) => {
      console.log(mp3)
      return <Song thumbnail={BillyThumbnail}
        singer="soyoung"
        title="Billy"
        mp3={mp3}
      />
    })
    return songs
  }
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div className="Song__Wrapper">
          {this.state.songs ? this._renderSong() : 'Loading'}
        </div>
      </div>

    )
  }
}

export default Home;