import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  selectSong,
  addHistory,
  loadSongDetail,
  loadSongsInfo
} from 'src/redux/music/actions'
import Loading from 'src/App/components/Loading'
import ArtworkPlay from '../components/ArtworkPlay'

class ArtWorkPlayContainer extends Component {
  onClickPlay = ({ songId, title, artworkUrl, duration }) => {
    this.props.selectSong([songId, title, artworkUrl, duration])
    this.props.addHistory(songId)
  }

  onClickSongDetail = songId => {
    this.props.loadSongDetail(songId)
  }

  renderArtworks = () => {
    return this.props.musicInfos.map(musicInfo => {
      return (
        <ArtworkPlay
          musicInfo={musicInfo}
          onClickPlay={this.onClickPlay}
          onClickSongDetail={this.onClickSongDetail}
        />
      )
    })
  }

  render() {
    return this.props.musicInfos ? this.renderArtworks() : <Loading />
  }
}

const mapStateToProps = ({ music }) => {
  return {
    musicInfos: music.musicInfo
  }
}
export default connect(
  mapStateToProps,
  { selectSong, addHistory, loadSongDetail, loadSongsInfo }
)(ArtWorkPlayContainer)
