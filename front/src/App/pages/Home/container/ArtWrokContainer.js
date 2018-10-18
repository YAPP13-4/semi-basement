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

// const ArtWorkPlayContainer = props => {
//   return props.music.musicInfo ? <ArtworkPlay {...props} /> : <Loading />
// }

class ArtWorkPlayContainer extends Component {

  renderArtworks = () => {
    console.log(this.props.musicInfos)
    return this.props.musicInfos.map((musicInfo) => {
      console.log(musicInfo)
      debugger
      return <ArtworkPlay { ...musicInfo} />
      // return <ArtworkPlay songId={musicInfo.id}  />
    })
  }

  render() {
    return this.props.musicInfos ? (
    this.renderArtworks()
    ) : (
      <Loading />
    )
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
