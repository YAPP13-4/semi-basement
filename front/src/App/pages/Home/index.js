import React, { Component } from 'react'
import Navigation from './components/Navigation/index'
import axios from 'axios';
import SONG_URL_LIST from '../../constants/test/SongUrlConstants'
import { resolveUrl } from '../../constants/ApiConstants'
import ArtworkPlay from './components/ArtworkPlay'

import classnames from 'classnames/bind'
import css from './index.scss'
import HistoryTab from '../../components/HistoryTab/HistoryTab'
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
              console.log('resolveUrl(url)',resolveUrl(url));
              this.setState({
                songInfos: this.state.songInfos.concat(response.data)
              }) 
            })
    })
  }

  _rederDiscover = () => {
    const songs = this.state.songInfos.map((songInfo, index) => {
      return <ArtworkPlay key={index}
                          singerName= {songInfo.user.permalink}
                          title = {songInfo.title}
                          artwork = {songInfo.artwork_url}
                          songId = {songInfo.id}
                          
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
        {/* 그냥 값이 잘 나오는지 보려고 test해보는 위치. 나중에 수정되어야 함.  */}
        <HistoryTab />
      </div>
    )
  }
}
export default Home;
