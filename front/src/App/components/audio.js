import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { SONG_STREAM_URL } from '../constants/ApiConstants'
const audio = (InnerComponent) => {
    class AudioComponent extends Component {
        constructor() {
            super();
            this.audioElement = null;

            this.onLoadStart = this.onLoadStart.bind(this);
            this.onPause = this.onPause.bind(this);
            this.onPlay = this.onPlay.bind(this);
            this.onTimeUpdate = this.onTimeUpdate.bind(this);
            this.onVolumeChange = this.onVolumeChange.bind(this);
      
            this.changeCurrentTime = this.changeCurrentTime.bind(this);
            this.changeVolume = this.changeVolume.bind(this);
            this.toggleMuted = this.toggleMuted.bind(this);
            this.togglePlay = this.togglePlay.bind(this);
        }
        
        componentDidMount() {
            const { audioElement } = this;
            audioElement.play();
          }
      
        componentDidUpdate(prevProps) {
            const { audioElement, props } = this;
            const { audioUrl } = props;
            if (prevProps.audioUrl !== audioUrl) {
              audioElement.play();
            }
        }
        onLoadStart() {
            const { onLoadStart } = this.props;
            onLoadStart();
          }
      
        onPlay() {
            const { onPlay } = this.props;
            onPlay();
        }
      
        onPause() {
            const { onPause } = this.props;
            onPause();
        }
      
        onTimeUpdate() {
            const { audioElement, props } = this;
            const { onTimeUpdate } = props;
            onTimeUpdate(Math.floor(audioElement.currentTime));
        }
      
        onVolumeChange() {
            const { audioElement, props } = this;
            const { muted, volume } = audioElement;
            const { onVolumeChange } = props;
            onVolumeChange(muted, volume);
        }
      
        changeCurrentTime(currentTime) {
            this.audioElement.currentTime = currentTime;
        }
      
        changeVolume(volume) {
            const { audioElement } = this;
            audioElement.muted = false;
            audioElement.volume = volume;
        }
      
        toggleMuted() {
            const { audioElement } = this;
            const { muted } = audioElement;
            audioElement.muted = !muted;
        }
      
        togglePlay() {
            const { audioElement } = this;
            if (audioElement.paused) {
              audioElement.play();
            } else {
              audioElement.pause();
            }
        }
        render() {
            const { song } = this.props;
            const songUrl = 'https://'+SONG_STREAM_URL.replace(':id',song[0])
           return(
               <div>
                   <audio
                    id="audio"
                    onLoadStart={this.onLoadStart}
                    onPause={this.onPause}
                    onPlay={this.onPlay}
                    onTimeUpdate={this.onTimeUpdate}
                    onVolumeChange={this.onVolumeChange}
                    ref={(node) => { this.audioElement = node; }}
                    src={songUrl}
                   ></audio>
                    <InnerComponent
                        {...this.state}
                        {...this.props}
                        changeCurrentTime={this.changeCurrentTime}
                        changeVolume={this.changeVolume}
                        toggleMuted={this.toggleMuted}
                        togglePlay={this.togglePlay}
                    />
               </div>
           )
        }               
    }
    return AudioComponent;
}
export default audio;