import React, { Component } from 'react';
import css from './HistoryTab.scss';
import classnames from 'classnames/bind';
import HistoryComponent from './HistoryComponent';
import { connect } from 'react-redux';
const cx = classnames.bind(css);
const moduleName = 'HistoryTab';

export class HistoryTab extends Component {
  renderHistory = () => {
    return this.props.historySong.map((song, index) => (
      <HistoryComponent
        key={`history-${index}`}
        songId={song.data.id}
        artwork={song.data.artwork_url}
        duration={song.data.duration}
        title={song.data.title}
        singer={song.data.user.username}
      />
    ));
  };
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div
          className={cx(`${moduleName}__Wrapper`)}
          style={{ color: '#ffffff' }}>
          {/*<button onClick={this._getHistorySong}>butn</button> */}
          {this.props.historySong ? this.renderHistory() : 'Loading'}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    historySong: state.music.historySong,
  };
}

export default connect(mapStateToProps)(HistoryTab);
