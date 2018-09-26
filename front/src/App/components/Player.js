import React from 'react';
import classnames from 'classnames/bind'
import css from './Player.scss'
import audio from './audio'
import getImageUrl from '../../utils/ImageUtils'
import IMAGE_SIZES from '../constants/ImageConstants'
import Slider from './Slider'
const cx = classnames.bind(css)
const moduleName = 'Player'
const Player = ({
    song,
    player,
    changeCurrentTime,
    togglePlay
  }) => {

    const artworkUrl = song[2]
    const title = song[1] 
    const duration = song[3]
    const { currentTime } = player
    console.log('current time ',currentTime)
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}__inner`)}>
        <div className={cx(`${moduleName}__section`)}>
            <div className={cx(`${moduleName}__buttons`)}>
              {/*TODO : prevButton*/}
              <div
                className={cx(`${moduleName}__button`)}
                role="button"
                tabIndex="0"
              >
                <i className="player__button__icon ion-ios-rewind" />
              </div>
              <div
                className={cx(`${moduleName}__button`)}
                role="button"
                onClick={togglePlay}
                tabIndex="0"

                style={{color:'#ffffff'}}
              >
                 <i className={cx(`${moduleName}__button__icon`)} />
                    
                    <span></span>
              </div>
               {/*TODO : nextButton*/}
              <div
                className="player__button"
                role="button"
                tabIndex="0"
              >
                <i className="player__button__icon ion-ios-fastforward" />
              </div>
            </div>
          </div>
          <div className={cx(`${moduleName}__section--seek`)}>
            <Slider
                max={duration}
                onChange={changeCurrentTime}
                value={currentTime}
            /> 
          </div>
          <div className="player__section player__section--time">
            <div className="player__time">
            Time
            </div>
          </div>
          <div className={cx(`${moduleName}__section`) }>
            <div className="player__song">
              <div className={cx(`${moduleName}__song__main`)}>
              <div className={cx(`${moduleName}__song__artwork`)} style={{ backgroundImage: `url(${getImageUrl(artworkUrl, IMAGE_SIZES.SMALL)})`}} />
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
            <div className="player__buttons player__buttons--options">
              <div

                role="button"
                tabIndex="0"
              >
                <i className="player__button__icon ion-loop" />
              </div>
              <div

                role="button"
                tabIndex="0"
              >
                <i className="player__button__icon ion-shuffle" />
              </div>
              <div

                role="button"
                tabIndex="0"
              >
                <i className="player__button__icon ion-android-list" />
              </div>
              <div
                className="player__button player__button--volume"
                role="button"
                tabIndex="0"
              >
              </div>
            </div>
          </div>
          <div className="player__section player__section--volume">

          </div>
        </div>
      </div>
    );
  };

  
  export default audio(Player);