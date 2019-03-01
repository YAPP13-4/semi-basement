import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectMusic, loadMusicDetail } from 'src/redux/music/actions';
import { changePlayList } from 'src/redux/playlist/actions';

import { setMyPlayerSubPlayList } from 'src/redux/myPlayer/actions';

import ArtworkPlay from '../components/ArtworkPlay';
import classnames from 'classnames/bind';
import css from './ArtWorkPlayContainer.scss';

import selectIcon from 'src/assets/icons/icon2.png';

const cx = classnames.bind(css);
const moduleName = 'ArtWorkPlayContainer';

const activePalyList = {
  cursor: 'pointer',
  background: `url(${selectIcon}) no-repeat -49px -152px`,
  width: '35px',
  height: '35px',
};
class ArtWorkPlayContainer extends PureComponent {
  onClickPlay = ({ id, title, musician, artworkImg, streamUrl, duration }) => {
    this.props.selectMusic({
      id,
      title,
      musician,
      artworkImg,
      streamUrl,
      duration,
    });
  };

  onClickChangePlayList = playlist => {
    if (
      !this.props.currentMusicListName ||
      this.props.currentMusicListName !== playlist
    ) {
      this.props.changePlayList(this.props.musicInfos, playlist);
      const myPlayList = JSON.parse(localStorage.getItem('myPlayList')) || [];

      this.props.setMyPlayerSubPlayList(myPlayList, 'My PlayList');
    }
  };

  renderArtworks = musicInfos => {
    if (!musicInfos) return;
    return musicInfos.map(musicInfo => {
      return (
        <ArtworkPlay
          key={musicInfo.id}
          musicInfo={musicInfo}
          onClickPlay={this.onClickPlay}
        />
      );
    });
  };

  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-category`)}>
          <div style={activePalyList} className="patch-icon" />
          <div className={cx(`${moduleName}-category-title`)}>
            {this.props.category}
          </div>
        </div>
        <div className={cx(`${moduleName}-musicWrapper`)}>
          {this.renderArtworks(this.props.musicInfos)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ playList }) => {
  return {
    musicList: playList.musicList,
    currentMusicListName: playList.currentList,
  };
};

export default connect(
  mapStateToProps,
  {
    selectMusic,
    loadMusicDetail,
    changePlayList,
    setMyPlayerSubPlayList,
  },
)(ArtWorkPlayContainer);

ArtWorkPlayContainer.propTypes = {
  musicInfos: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
};
