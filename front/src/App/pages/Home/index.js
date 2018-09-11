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
      this._requestId();
    }

  _requestId = () => {
      return axios.get(resolveUrl('https://soundcloud.com/matas/frost-theme-0-1'))
      .then(response => {
        console.log(response.data)
          this.setState({
              singerId : response.data.id,
              artwrokUrl : response.data.artwork_url
          })
          this.props.selectSong(this.state.singerId)
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <Navigation />
        <div className={cx(`${moduleName}-songWrapper`)}>
          <ArtworkPlay artwork = {this.state.artwrokUrl}
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
