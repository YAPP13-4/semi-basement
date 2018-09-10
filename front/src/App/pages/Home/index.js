import React, { Component } from 'react'
import { callApi } from '../../../utils/ApiUtils'
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
      this._requestId();
    }

  _requestId = () => {
      return axios.get(resolveUrl('https://soundcloud.com/matas/frost-theme-0-1'))
      .then(response => {
        console.log(response.data)
          console.log(response.data.id)
          console.log(response.data.artwork_url)
          this.setState({
              singerId : response.data.id,
              artwrokUrl : response.data.artwork_url
          })    
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <Navigation />
        <div className={cx(`${moduleName}-songWrapper`)}>
          <ArtworkPlay 
            id = {this.state.singerId}
            artwork = {this.state.artwrokUrl}
          />
        </div>
      </div>
    )
  }
}

export default Home
