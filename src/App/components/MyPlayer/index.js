import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import axios from 'axios';

import { toggleMyplayer } from 'src/redux/meta/actions.js';
import { selectMusic } from 'src/redux/music/actions';
import {
  onPlay,
  onPause,
  playNextMusic,
  playPrevMusic,
  changeMyPlayerCurrentTime,
  changeMyPlayerVolume,
} from 'src/redux/player/actions';
import { changePlayList } from 'src/redux/playlist/actions';
import {
  removeMusicMyPlaylist,
  setMyPlayerSubPlayList,
} from 'src/redux/myPlayer/actions';
import Slider from 'src/App/components/Slider/';
import * as utils from 'src/utils';
import { MUSIC_URL } from 'src/App/constants/ApiConstants';
import IMAGE_SIZES from 'src/App/constants/ImageConstants';

import css from './index.scss';
import PlayerListItem from './components/PlayerListItem';

const cx = classnames.bind(css);
const moduleName = 'MyPlayer';

class MyPlayer extends Component {
  state = {
    musicListInfos: [],
  };

  componentDidMount() {
    this.getMusicListInfos(this.props.musicList);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.musicList !== this.props.musicList) {
      this.getMusicListInfos(this.props.musicList);
    }
  }

  handleClose = () => {
    this.props.toggleMyplayer();
  };

  togglePlay = () => {
    const { player, onPause, onPlay } = this.props;
    player.isPlaying ? onPause() : onPlay();
  };

  onClickPlay = ({ id, title, musician, artworkUrl, duration }) => {
    this.props.selectMusic({ id, title, musician, artworkUrl, duration });
  };

  getMusicListInfos = musicList => {
    if (!musicList) return;
    axios
      .all(musicList.map(musicId => this.getMusicInfo(musicId)))
      .then(res => this.setState({ musicListInfos: res }));
  };

  getMusicInfo = musicId => {
    return axios
      .get(MUSIC_URL.replace(':id', musicId))
      .then(
        ({
          data: {
            artwork_url,
            title,
            duration,
            user: { username },
          },
        }) => {
          return {
            id: musicId,
            artworkUrl: artwork_url,
            title,
            musician: username,
            duration: duration / 1000,
          };
        },
      );
  };

  renderPlayList = () => {
    if (!this.state.musicListInfos.length) return <div />;
    return this.state.musicListInfos.map((info, index) => {
      return (
        <PlayerListItem
          key={index}
          info={info}
          index={index}
          onClickPlay={this.onClickPlay}
        />
      );
    });
  };

  render() {
    const { playingMusic, player } = this.props;
    const { currentTime } = player;
    const { title, musician, artworkUrl, duration } = playingMusic || {};
    return (
      <div
        className={cx(`${moduleName}`, {
          [`${moduleName}--closed`]: !this.props.showMyplayer,
        })}>
        <div onClick={this.handleClose} className={cx(`${moduleName}-close`)} />
        <div
          className={cx(`${moduleName}-topImageWrapper`)}
          style={{
            backgroundImage: `url(${utils.getImageUrl(
              artworkUrl,
              IMAGE_SIZES.XLARGE,
            )})`,
          }}>
          <div
            className={cx(`${moduleName}-topImage`)}
            style={{
              backgroundImage: `url(${utils.getImageUrl(
                artworkUrl,
                IMAGE_SIZES.XLARGE,
              )})`,
            }}
          />
        </div>
        <div className={cx(`${moduleName}-top`)}>
          <div className={cx(`${moduleName}-top-musicCard`)}>
            <div
              className={cx(`${moduleName}-top-musicCard-coverImg`)}
              style={{
                backgroundImage: `url(${utils.getImageUrl(
                  artworkUrl,
                  IMAGE_SIZES.XLARGE,
                )})`,
              }}
            />
            <div>
              <div className={cx(`${moduleName}-top-musicCard-musicInfo`)}>
                <p>{musician}</p>
                <h2>{title}</h2>
              </div>
              <div className={cx(`${moduleName}-top-musicCard-player`)}>
                <div
                  className={cx(`${moduleName}-top-musicCard-player-prev`)}
                  onClick={this.props.playPrevMusic}>
                  <i />
                </div>
                <div
                  className={cx(
                    `${moduleName}-top-musicCard-player-` +
                      (this.props.player.isPlaying ? 'pause' : 'play'),
                  )}
                  onClick={this.togglePlay}>
                  <i />
                </div>
                <div
                  className={cx(`${moduleName}-top-musicCard-player-next`)}
                  onClick={this.props.playNextMusic}>
                  <i />
                </div>
              </div>
            </div>
          </div>
          <div className={cx(`${moduleName}-top-musicController`)}>
            <div className={cx(`${moduleName}-top-musicController-slider`)}>
              <div
                className={cx(`${moduleName}-top-musicController-slider-left`)}>
                {utils.formatSeconds(currentTime)}
              </div>
              <div
                className={cx(
                  `${moduleName}-top-musicController-slider-center`,
                )}>
                <Slider
                  max={duration}
                  onChange={this.props.changeMyPlayerCurrentTime}
                  value={currentTime}
                />
              </div>
              <div
                className={cx(
                  `${moduleName}-top-musicController-slider-right`,
                )}>
                {utils.formatSeconds(duration)}
              </div>
            </div>
            <div
              className={cx(`${moduleName}-top-musicController-soundWrapper`)}>
              <div className={cx(`${moduleName}-top-musicController-sound`)}>
                <Slider
                  max={1}
                  onChange={this.props.changeMyPlayerVolume}
                  value={this.props.player.myPlayerVolume}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={cx(`${moduleName}-bottom`)}>
          <div className={cx(`${moduleName}-bottom-playlist`)}>
            <div className={cx(`${moduleName}-bottom-playlist-shuffle`)}>
              <i />
            </div>
            <h3 className={cx(`${moduleName}-bottom-playlist-mainTitle`)}>
              {this.props.currentMusicListName}
            </h3>
            <h4
              className={cx(`${moduleName}-bottom-playlist-toggleTitle`)}
              onClick={() => {
                this.props.setMyPlayerSubPlayList(
                  this.props.musicList,
                  this.props.currentMusicListName,
                );
                this.props.changePlayList(
                  this.props.myPlayer.subPlayList,
                  this.props.myPlayer.subPlayListName,
                );
              }}>
              {this.props.myPlayer.subPlayListName}
              <i />
            </h4>
          </div>
          <div className={cx(`${moduleName}-bottom-musicWrapper`)}>
            {this.renderPlayList()}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    const { meta, player, music, playList, myPlayer } = state;
    return {
      showMyplayer: meta.showMyplayer,
      player,
      playingMusic: music.playingMusic,
      currentMusicListName: playList.currentList,
      musicList: playList.musicList,
      myPlayer,
    };
  },
  {
    toggleMyplayer,
    changeMyPlayerCurrentTime,
    changeMyPlayerVolume,
    changePlayList,
    onPlay,
    onPause,
    playNextMusic,
    playPrevMusic,
    setMyPlayerSubPlayList,
    removeMusicMyPlaylist,
    selectMusic,
  },
)(MyPlayer);
