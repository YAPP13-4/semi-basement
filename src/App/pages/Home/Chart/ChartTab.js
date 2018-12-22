import React, { Component } from "react"
import { connect } from "react-redux"
import { loadChartSongsInfo } from "src/redux/chart/actions"
import {
  selectSong,
  historySong,
  loadSongDetail,
  loadSongsInfo
} from "src/redux/music/actions"
import PropTypes from "prop-types"
import Loading from "src/App/components/Loading"
import classnames from "classnames/bind"
import SongChartList from "./constants/test/SongChartList"
import css from "./ChartTab.scss"
import ChartTabItem from "./ChartTabItem"

const cx = classnames.bind(css)
const moduleName = "ChartTab"

class ChartTab extends Component {
  static propTypes = {
    isMypge: PropTypes.bool,
    searchKeyWord: PropTypes.string
  }
  static defaultProps = {
    isMypge: false,
    searchKeyWord: ""
  }
  componentDidMount() {
    this.props.loadChartSongsInfo(SongChartList)
  }
  onClickPlay = ({ songId, title, artworkUrl, duration }) => {
    this.props.selectSong([songId, title, artworkUrl, duration])
    this.props.historySong(songId)
  }

  renderChart = () => {
    // const filteredMusic = this.musicSearch(this.props.searchKeyWord)
    return this.props.chartInstanceData.map((musicInfo, index) => {
      return (
        <ChartTabItem
          ind={index}
          musicInfo={musicInfo}
          onClickPlay={this.onClickPlay}
        />
      )
    })
  }
  //나중에 서버에서 song을 받아오면... .. state 수정해서 넣어야지 ..
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-chart`)}>
          <table>
            <tbody>
              {this.props.chartInstanceData ? this.renderChart() : <Loading />}
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
  { loadChartSongsInfo, selectSong, historySong, loadSongDetail, loadSongsInfo }
)(ChartTab)
