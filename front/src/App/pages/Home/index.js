import React, { Component } from 'react'
import Navigation from './components/Navigation/index'

import { selectSong } from '../../../actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios';
import SONG_URL_LIST from '../../constants/test/SongUrlConstants'
import { resolveUrl } from '../../constants/ApiConstants'
import ArtworkPlay from './components/ArtworkPlay'

import classnames from 'classnames/bind'
import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'Home'

class Home extends Component {
  state = {
    songInfos : [],
  }

  componentDidMount() {
      this._requestId();
    }
  _getInfo = async() => {
    const info = await this._requestId()  
  }
  _requestId = () => {
    SONG_URL_LIST.map( (url)=> {
      return axios.get(resolveUrl(url))
            .then(response => {
              this.setState({
                songInfos: this.state.songInfos.concat(response.data)
              }) 
              //return response.data;
            })
    })
  }
  _fetchSong = (songInfo) => {
    console.log('click',songInfo);
    this.props.selectSong(songInfo.id) // 속성 뭔지 확인해서 고치기 
  }
  _rederDiscover = () => {
    const songs = this.state.songInfos.map((songInfo, index) => {
      //console.log('songinfo',songInfo)
      return <ArtworkPlay key={index}
                          singerName= {songInfo.user.permalink}
                          title = {songInfo.title}
                          artwork = {songInfo.artwork_url}
                          selected={()=>{ this._fetchSong(songInfo) }}
              />
    })
    return songs  
  }
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <Navigation />
        <div className={cx(`${moduleName}-category`)}>
          <div></div> <div className={cx(`${moduleName}-category-title`)}>SEBA's Choice</div> 
        </div>
        <div className={cx(`${moduleName}-songWrapper`)}>
          {this.state.songInfos ? this._rederDiscover() : 'Loading'}                                                
        </div>

      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectSong} , dispatch)
}

export default connect(null, mapDispatchToProps)(Home)

