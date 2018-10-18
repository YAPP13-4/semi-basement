import React from "react"
import { connect } from "react-redux"
import {
  selectSong,
  addHistory,
  loadSongDetail,
  loadSongsInfo
} from "src/redux/music/actions"
import ArtworkPlay from "../components/ArtworkPlay"

const ArtWorkPlayContainer = props => {
  return <ArtworkPlay {...props} />
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
