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

const activePlayList = {
  cursor: 'pointer',
  background: `url(${selectIcon}) no-repeat -49px -152px`,
  width: '35px',
  height: '35px',
};

const deactivePlayList = {
  cursor: 'pointer',
  background: `url(${selectIcon}) no-repeat -115px -156px`,
  width: `28px;`,
  height: `29px`,
};

class ArtWorkPlayContainer extends PureComponent {
  state = {
    togglePlayList: false,
  };

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
    if (this.props.currentMusicListName === playlist) return;

    const { changePlayList, setMyPlayerSubPlayList } = this.props;

    changePlayList(musicInfos, playlist);
    const myPlayList = JSON.parse(localStorage.getItem('myPlayList')) || [];
    setMyPlayerSubPlayList(myPlayList, 'My PlayList');
    this.setState(prevState => ({
      togglePlayList: !prevState.togglePlayList,
    }));
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
    const { togglePlayList } = this.state;
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-category`)}>
          <div
            style={togglePlayList ? activePlayList : deactivePlayList}
            className="patch-icon"
            onClick={() => this.onClickChangePlayList(this.props.category)}
          />
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
