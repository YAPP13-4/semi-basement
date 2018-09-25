import React from 'react';
import audio from './audio'
import getImageUrl from '../../utils/ImageUtils'
import IMAGE_SIZES from '../constants/ImageConstants'
const Player = ({
    song,
    togglePlay
  }) => { 
    console.log('player',song)
    const artworkUrl = song[2]
    const title = song[1] 
    return (
      <div className="player">
        <div className="player__inner container">
          <div className="player__section player__section--song">
            <div className="player__song">
              <div className="player__song__main">
              <div className="player__song__artwork" style={{ backgroundImage: `url(${getImageUrl(artworkUrl, IMAGE_SIZES.SMALL)})` }} />
                <h3 style={{color:"#ffffff"}} >{title}</h3>
                
              </div>
            </div>
          </div>
          <div className="player__section">
            <div className="player__buttons">
              <div
                className="player__button"
                role="button"
                tabIndex="0"
              >
                <i className="player__button__icon ion-ios-rewind" />
              </div>
              <div
                className="player__button"
                role="button"
                onClick={togglePlay}
                tabIndex="0"

                style={{color:'#ffffff'}}
              >
                Play
              </div>
              <div
                className="player__button"
                role="button"
                tabIndex="0"
              >
                <i className="player__button__icon ion-ios-fastforward" />
              </div>
            </div>
          </div>
          <div className="player__section player__section--seek">
          </div>
          <div className="player__section player__section--time">
            <div className="player__time">
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