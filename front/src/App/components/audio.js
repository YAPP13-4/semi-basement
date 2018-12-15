import React, { Component } from 'react';
import { SONG_STREAM_URL } from '../constants/ApiConstants';
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
      const { audioElement } = this;
      audioElement.play();
    }

    componentDidUpdate(prevProps) {
      const { audioElement, props } = this;
      const { song, player } = props;
      const audioUrl = song.songId;
      const prevSong = prevProps.song.songId;
      if (prevSong !== audioUrl) {
        audioElement.play();
      }
      if (props.meta.showMyplayer && this.shouldToggleplay(prevProps, props)) {
        this.toggleSidePlayerPlay(player, audioElement);
      }
      if (
        props.meta.showMyplayer &&
        this.shouldChangeCurrentTime(prevProps, props)
      ) {
        audioElement.currentTime = props.player.myPlayerCurrentTime;
      }
      if (
        props.meta.showMyplayer &&
        this.shouldChangeVolume(prevProps, props)
      ) {
        // audioElement.muted = false
        audioElement.volume = props.player.myPlayerVolume;
      }
    }

    toggleSidePlayerPlay = (player, audioElement) => {
      player.isPlaying ? audioElement.play() : audioElement.pause();
    };

    shouldToggleplay = (prevProps, props) =>
      prevProps.player.isPlaying !== props.player.isPlaying;

    shouldChangeCurrentTime = (prevProps, props) =>
      prevProps.player.myPlayerCurrentTime !== props.player.myPlayerCurrentTime;

    shouldChangeVolume = (prevProps, props) =>
      prevProps.player.myPlayerVolume !== props.player.myPlayerVolume;

    onEnded() {
      const { props } = this;
      const { playNexSong } = props;
      playNexSong();
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
      const songUrl = 'https:' + SONG_STREAM_URL.replace(':id', song.songId);
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
