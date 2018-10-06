import React, { Component } from "react";
import { SONG_STREAM_URL } from "../constants/ApiConstants";
const audio = InnerComponent => {
  class AudioComponent extends Component {
    constructor() {
      super();
      this.audioElement = null;
      this.onEnded = this.onEnded.bind(this);
      this.onLoadStart = this.onLoadStart.bind(this);
      this.onLoadedMetadata = this.onLoadedMetadata.bind(this);
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
      //console.log("audio", this.props);
      const { audioElement } = this;
      audioElement.play();
    }

    componentDidUpdate(prevProps) {
      const { audioElement, props } = this;
      const { song } = props;
      const audioUrl = song[0];
      const prevSong = prevProps.song[0];
      if (prevSong !== audioUrl) {
        audioElement.play();
      }
    }
    onEnded() {
      console.log(this.props);
      const { props } = this;
      const { playNextSongFromButton } = props;
      playNextSongFromButton();
    }
    onLoadedMetadata() {
      const { audioElement, props } = this;
      const { onLoadedMetadata } = props;
      onLoadedMetadata(Math.floor(audioElement.duration));
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
      if (this.props.player.isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
    }
    render() {
      const { song } = this.props;
      const songUrl = "https:" + SONG_STREAM_URL.replace(":id", song[0]);
      return (
        <div>
          <audio
            id="audio"
            onEnded={this.onEnded}
            onLoadedMetadata={this.onLoadedMetadata}
            onLoadStart={this.onLoadStart}
            onPause={this.onPause}
            onPlay={this.onPlay}
            onTimeUpdate={this.onTimeUpdate}
            onVolumeChange={this.onVolumeChange}
            ref={node => {
              this.audioElement = node;
            }}
            src={songUrl}
          />
          <InnerComponent
            {...this.state}
            {...this.props}
            changeCurrentTime={this.changeCurrentTime}
            changeVolume={this.changeVolume}
            toggleMuted={this.toggleMuted}
            togglePlay={this.togglePlay}
          />
        </div>
      );
    }
  }
  return AudioComponent;
};
export default audio;
