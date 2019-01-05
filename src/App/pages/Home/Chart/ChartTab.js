import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadChartMusicsInfo } from 'src/redux/chart/actions';
import {
  selectMusic,
  historyMusic,
  loadMusicDetail,
  // loadMusicsInfo,
} from 'src/redux/music/actions';
import PropTypes from 'prop-types';
import Loading from 'src/App/components/Loading';
import classnames from 'classnames/bind';
import MusicChartList from './constants/test/MusicChartList';
import css from './ChartTab.scss';
import ChartTabItem from './ChartTabItem';

const cx = classnames.bind(css);
const moduleName = 'ChartTab';

class ChartTab extends Component {
  static propTypes = {
    isMypge: PropTypes.bool,
    searchKeyWord: PropTypes.string,
  };

  static defaultProps = {
    isMypge: false,
    searchKeyWord: '',
  };

  componentDidMount() {
    this.props.loadChartMusicsInfo(MusicChartList);
  }

  onClickPlay = ({ id, title, musician, artworkUrl, duration }) => {
    this.props.selectMusic({ id, title, musician, artworkUrl, duration });
    this.props.historyMusic(id);
  };

  renderChart = () => {
    return this.props.chartInstanceData.map((musicInfo, index) => {
      return (
        <ChartTabItem
          ind={index}
          musicInfo={musicInfo}
          onClickPlay={this.onClickPlay}
        />
      );
    });
  };
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
    );
  }
}
function mapStateToProps({ chartMusic }) {
  return {
    chartMusicInfo: chartMusic.musicInfo,
  };
}
export default connect(
  mapStateToProps,
  {
    loadChartMusicsInfo,
    selectMusic,
    historyMusic,
    loadMusicDetail,
    // loadMusicsInfo,
  },
)(ChartTab);
