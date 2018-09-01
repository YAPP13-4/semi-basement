import React, { Component } from 'react'


import MusicPlayer from 'react-responsive-music-player'

// import classnames from 'classnames/bind'
import css from './index.scss'

import first from '../../../assets/mp3/Billy.mp3'
import first_pic from '../../../assets/logos/Billy.jpg'

// const cx = classnames.bind(css)
// const moduleName = 'BottomPlayer'
const playlist = [
    {
      url: first,
      cover: first_pic,
      title: 'Despacito',
      artist: [
        'Luis Fonsi',
        'Daddy Yankee'
      ]
    },
  ]
class BottomPlayer extends Component {
    render() {
        return (
            <MusicPlayer playlist={playlist}/>
        )
      }
}
    
export default BottomPlayer