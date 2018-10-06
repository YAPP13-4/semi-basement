import React from 'react'
import classnames from 'classnames/bind'
import css from './Player.scss'
import audio from './audio'

import getImageUrl from '../../utils/ImageUtils'
import IMAGE_SIZES from '../constants/ImageConstants'
import Slider from './Slider'
import { formatSeconds } from '../../utils/NumberUtils'
import HistoryTab from './HistoryTab/HistoryTab'

const cx = classnames.bind(css)
const moduleName = 'Player'
const Player = ({
  meta,
  song,
  player,
  changeCurrentTime,
  togglePlay,
  toggleMuted,
  toggleHistory,
  playNextSongFromButton,
  playPrevSongFromButton,
  addPlaylist
}) => {
  const artworkUrl = song[2]
  const title = song[1]
  const duration = song[3]
  const { currentTime, isPlaying } = player

  return (
    <div className={cx(`${moduleName}`)}>
      <div
        className={cx(
          `${moduleName}` + (meta.toggleHistory ? '-history' : '-none')
        )}
      >
        <div className={cx(`${moduleName}__inner`)}>
          <div className={cx(`${moduleName}__section`)}>
            <div className={cx(`${moduleName}__buttons`)}>
              {/*TODO : prevButton*/}
              <div
                className={cx(`${moduleName}__button`)}
                role="button"
                tabIndex="0"
                onClick={playPrevSongFromButton}
              >
                <i className={cx(`${moduleName}__button__prev`)} />
              </div>
              <div
                className={cx(`${moduleName}__button`)}
                role="button"
                onClick={togglePlay}
                tabIndex="0"
                style={{ color: '#ffffff' }}
              >
                <i
                  className={cx(
                    `${moduleName}__button__` + (isPlaying ? 'play' : 'pause')
                  )}
                />
              </div>
              {/*TODO : nextButton*/}
              <div
                className={cx(`${moduleName}__button`)}
                role="button"
                tabIndex="0"
                onClick={() => {
                  playNextSongFromButton(song[0])
                }}
              >
                <i className={cx(`${moduleName}__button__forward`)} />
              </div>
            </div>
          </div>
          <div className={cx(`${moduleName}__section--time`)}>
            <div style={{ color: '#45f7aa' }}>{formatSeconds(currentTime)}</div>
          </div>
          <div className={cx(`${moduleName}__section--seek`)}>
            <Slider
              max={duration}
              onChange={changeCurrentTime}
              value={currentTime}
            />
          </div>
          <div className={cx(`${moduleName}__section--time`)}>
            <div className="player__time">{formatSeconds(duration)}</div>
          </div>

          <div className={cx(`${moduleName}__section`)}>
            <div
              className={cx(`${moduleName}__button`)}
              role="button"
              onClick={toggleMuted}
              tabIndex="0"
              style={{
                marginLeft: '2em',
                paddingTop: '11px'
              }}
            >
              <i className={cx(`${moduleName}__button__mute`)} />
            </div>
            <div className="player__song">
              <div className={cx(`${moduleName}__song__main`)}>
                <div
                  className={cx(`${moduleName}__song__artwork`)}
                  style={{
                    backgroundImage: `url(${getImageUrl(
                      artworkUrl,
                      IMAGE_SIZES.SMALL
                    )})`
                  }}
                />
                {/*TODO : Change Link*/}
                <div className={cx(`${moduleName}__song_infoWrapper`)}>
                  <div className={cx(`${moduleName}__song__title`)}>
                    {title}
                  </div>
                  <div className={cx(`${moduleName}__song__username`)}>
                    Creator
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="player__section player__section--options">
            <div className={cx(`${moduleName}__buttons`)}>
              <div role="button" tabIndex="0">
                <span
                  className={cx(`${moduleName}__add_playlist`)}
                  onClick={addPlaylist}
                />
              </div>
              <div role="button" tabIndex="0">
                <span className={cx(`${moduleName}__heart`)} />
              </div>
              <div role="button" tabIndex="0">
                <span
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
        style={{ display: meta.toggleHistory ? 'block' : 'none' }}
        className={cx(`${moduleName}__historyTab`)}
      >
        {' '}
        <HistoryTab />{' '}
      </div>
    </div>
  )
}

export default audio(Player)
