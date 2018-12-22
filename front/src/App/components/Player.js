import React from 'react';
import classnames from 'classnames/bind';
import css from './Player.scss';
import audio from './audio';

import * as utils from 'src/utils';
import IMAGE_SIZES from '../constants/ImageConstants';
import Slider from './Slider';
import HistoryTab from './HistoryTab/HistoryTab';

const cx = classnames.bind(css);
const moduleName = 'Player';
const Player = ({
  meta,
  song,
  player,
  changeCurrentTime,
  changeVolume,
  togglePlay,
  toggleMuted,
  toggleHistory,
  toggleShuffle,
  playNextSong,
  playPrevSong,
  addSongMyPlaylist,
}) => {
  const { songId, title, singer, artworkUrl, duration } = song;

  const { currentTime, isPlaying, muted, shuffle } = player;
  const volume = muted ? 0 : player.volume;

  return (
    <div
      className={cx(`${moduleName}`, {
        [`${moduleName}--hide`]: !meta.showBottomplayer,
      })}
      // style={{ display: meta.showBottomplayer ? "" : "none" }}
    >
      <div
        className={cx(`${moduleName}-control`, {
          [`${moduleName}-control--open`]: meta.toggleHistory,
        })}>
        <div className={cx(`${moduleName}__inner`)}>
          <div className={cx(`${moduleName}__section`)}>
            <div className={cx(`${moduleName}__buttons`)}>
              {/*TODO : prevButton*/}
              <div
                className={cx(`${moduleName}__button`)}
                role="button"
                tabIndex="0"
                onClick={playPrevSong}>
                <i className={cx(`${moduleName}__button__prev`)} />
              </div>
              <div
                className={cx(`${moduleName}__button`)}
                role="button"
                onClick={togglePlay}
                tabIndex="0"
                style={{ color: '#ffffff' }}>
                <i
                  className={cx(
                    `${moduleName}__button__` + (isPlaying ? 'play' : 'pause'),
                  )}
                />
              </div>
              {/*TODO : nextButton*/}
              <div
                className={cx(`${moduleName}__button`)}
                role="button"
                tabIndex="0"
                onClick={() => {
                  playNextSong(songId);
                }}>
                <i className={cx(`${moduleName}__button__forward`)} />
              </div>
              <div
                className={cx(`${moduleName}__button`)}
                onClick={toggleShuffle}>
                <i
                  className={cx(
                    `${moduleName}__button__` +
                      (shuffle ? 'shuffle' : 'no-shuffle'),
                  )}
                />
              </div>
            </div>
          </div>
          <div className={cx(`${moduleName}__section--time`)}>
            <div
              style={{ color: '#45f7aa', width: '50px', textAlign: 'center' }}>
              {utils.formatSeconds(currentTime)}
            </div>
          </div>
          <div className={cx(`${moduleName}__section--seek`)}>
            <Slider
              max={duration}
              onChange={changeCurrentTime}
              value={currentTime}
            />
          </div>
          <div className={cx(`${moduleName}__section--time`)}>
            <div className="player__time">{utils.formatSeconds(duration)}</div>
          </div>

          <div className={cx(`${moduleName}__section`)}>
            <div
              className={cx(`${moduleName}__button`)}
              role="button"
              tabIndex="0"
              style={{
                paddingTop: '11px',
                display: 'flex',
              }}>
              <i
                onClick={toggleMuted}
                className={cx(`${moduleName}__button__mute`)}
              />

              <div className={cx(`${moduleName}__section--volume`)}>
                <Slider max={1} onChange={changeVolume} value={volume} />
              </div>
            </div>
            <div className="player__song">
              <div className={cx(`${moduleName}__song__main`)}>
                <div
                  className={cx(`${moduleName}__song__artwork`)}
                  style={{
                    backgroundImage: `url(${utils.getImageUrl(
                      artworkUrl,
                      IMAGE_SIZES.SMALL,
                    )})`,
                  }}
                />
                {/*TODO : Change Link*/}
                <div className={cx(`${moduleName}__song_infoWrapper`)}>
                  <div className={cx(`${moduleName}__song__title`)}>
                    {title}
                  </div>
                  <div className={cx(`${moduleName}__song__username`)}>
                    {singer}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="player__section player__section--options"
            style={{ marginLeft: '30px' }}>
            <div className={cx(`${moduleName}__buttons`)}>
              <div role="button" tabIndex="0">
                <span
                  style={{ marginLeft: '10px' }}
                  className={cx(`${moduleName}__add_playlist`)}
                  onClick={() => {
                    addSongMyPlaylist(songId);
                  }}
                />
              </div>
              <div role="button" tabIndex="0">
                <span
                  style={{ marginLeft: '10px' }}
                  className={cx(`${moduleName}__heart`)}
                />
              </div>
              <div role="button" tabIndex="0">
                <span
                  style={{ marginLeft: '16px' }}
                  className={cx(`${moduleName}__toggle__history`)}
                  onClick={toggleHistory}
                />
              </div>
              <div
                className="player__button player__button--volume"
                role="button"
                tabIndex="0"
              />
            </div>
          </div>
          <div className="player__section player__section--volume" />
        </div>
      </div>
      <div
        className={cx(`${moduleName}__historyTab`, {
          [`${moduleName}__historyTab--open`]: meta.toggleHistory,
        })}>
        <HistoryTab />
      </div>
    </div>
  );
};

export default audio(Player);
