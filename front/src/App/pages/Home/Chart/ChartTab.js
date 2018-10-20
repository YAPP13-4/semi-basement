import React, { Component } from "react"
import { connect } from "react-redux"
import { loadChartSongsInfo } from "src/redux/chart/actions"
import {
  selectSong,
  addHistory,
  loadSongDetail,
  loadSongsInfo
} from "src/redux/music/actions"
import Loading from "src/App/components/Loading"
import classnames from "classnames/bind"
import SongChartList from "./constants/test/SongChartList"
import Navigation from "../components/Navigation/index"
import css from "./ChartTab.scss"
import ChartTabItem from "./ChartTabItem"

const cx = classnames.bind(css)
const moduleName = "ChartTab"

class ChartTab extends Component {
  componentDidMount() {
    //this._requestId()
    this.props.loadChartSongsInfo(SongChartList)
  }
  onClickPlay = ({ songId, title, artworkUrl, duration }) => {
    this.props.selectSong([songId, title, artworkUrl, duration])
    this.props.addHistory(songId)
  }

  onClickSongDetail = songId => {
    this.props.loadSongDetail(songId)
  }

  renderChart = () => {
    return this.props.chartMusicInfo.map((musicInfo, index) => {
      //console.log('data',songInfo)
      return (
        <ChartTabItem
          ind={index}
          musicInfo={musicInfo}
          onClickPlay={this.onClickPlay}
          onClickSongDetail={this.onClickSongDetail}
        />
      )
    })
  }
  //나중에 서버에서 song을 받아오면... .. state 수정해서 넣어야지 ..
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <Navigation />
        <div className={cx(`${moduleName}-selectTab`)}>
          <div />
          <div>
            <select>
              <option value="Top50">Top 50</option>
            </select>
          </div>
        </div>
        <div className={cx(`${moduleName}-chart`)}>
          <table>
            <tbody>
              {this.props.chartMusicInfo ? this.renderChart() : <Loading />}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
function mapStateToProps({ chartMusic }) {
  return {
    chartMusicInfo: chartMusic.musicInfo
  }
}
export default connect(
  mapStateToProps,
  { loadChartSongsInfo, selectSong, addHistory, loadSongDetail, loadSongsInfo }
)(ChartTab)
