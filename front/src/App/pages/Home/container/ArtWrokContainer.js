import React from "react"
import { connect } from "react-redux"
import {
  selectSong,
  addHistory,
  loadSongDetail,
  loadSongsInfo
} from "src/redux/music/actions"
import Loading from "src/App/components/Loading"
import ArtworkPlay from "../components/ArtworkPlay"

//여기서 맵돌기 ! ! ! !
const ArtWorkPlayContainer = props => {
  return props.music.musicInfo ? <ArtworkPlay {...props} /> : <Loading />
}

const mapStateToProps = ({ music }) => {
  return {
    music
  }
}
export default connect(
  mapStateToProps,
  { selectSong, addHistory, loadSongDetail, loadSongsInfo }
)(ArtWorkPlayContainer)
