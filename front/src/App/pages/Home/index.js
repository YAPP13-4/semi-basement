import React, { Component } from 'react'
import { selectSong } from '../../../actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios';
import { resolveUrl,SONG_URL } from '../../constants/ApiConstants'

import ArtworkPlay from './components/ArtworkPlay'

import classnames from 'classnames/bind'
import css from './index.scss'

import Navigation from './components/Navigation'

const cx = classnames.bind(css)
const moduleName = 'Home'

class Home extends Component {
  state = {}
  constructor() {
      super();
     
  }
  componentDidMount() {
      this._getInfo();
    }
  _getInfo = async() => {
    const info = await this._requestId()
    this.setState({
      singerId : info.id,
      title : info.title,
      singerName : info.user.username,
      artwrokUrl : info.artwork_url
  })    
  }
  _requestId = () => {
      return axios.get(resolveUrl('https://soundcloud.com/matas/frost-theme-0-1'))
      .then(response => {
        console.log(response.data);
        return response.data
      })
      .catch(err => console.log(err))
  }
  _fetchSong = () => {
    console.log('fetchsong')
    this.props.selectSong(this.state.singerId)
  }
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <Navigation />
        <div className={cx(`${moduleName}-category`)}>
            SEBA's Choice
        </div>
        <div className={cx(`${moduleName}-songWrapper`)}>
          <ArtworkPlay 
              singerName= {this.state.singerName}
              title = {this.state.title}
              artwork = {this.state.artwrokUrl}
              selected={this._fetchSong}
          />
          <ArtworkPlay 
              singerName= {this.state.singerName}
              title = {this.state.title}
              artwork = {this.state.artwrokUrl}
              selected={this._fetchSong}
          />
          <ArtworkPlay 
              singerName= {this.state.singerName}
              title = {this.state.title}
              artwork = {this.state.artwrokUrl}
              selected={this._fetchSong}
          />
          <ArtworkPlay 
              singerName= {this.state.singerName}
              title = {this.state.title}
              artwork = {this.state.artwrokUrl}
              selected={this._fetchSong}
          />
          <ArtworkPlay 
              singerName= {this.state.singerName}
              title = {this.state.title}
              artwork = {this.state.artwrokUrl}
              selected={this._fetchSong}
          />
          <ArtworkPlay 
              singerName= {this.state.singerName}
              title = {this.state.title}
              artwork = {this.state.artwrokUrl}
              selected={this._fetchSong}
          />                                                   
        </div>

      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectSong} , dispatch)
}

export default connect(null, mapDispatchToProps)(Home)
