import * as types from "./ActionType";
import * as musicActions from "../music/ActionType";
import axios from "axios";
import { selectSong } from "../music/actions";
import { SONG_URL } from "../../App/constants/ApiConstants";

export const onLoadedMetadata = duration => ({
  type: types.ON_LOADED_METADATA,
  duration
});
export const onLoadStart = () => ({
  type: types.ON_LOAD_START
});

export const onPause = () => ({
  type: types.ON_PAUSE
});

export const onPlay = () => ({
  type: types.ON_PLAY
});

export const onTimeUpdate = currentTime => ({
  type: types.ON_TIME_UPDATE,
  currentTime
});

export const onVolumeChange = (muted, volume) => ({
  type: types.ON_VOLUME_CHANGE,
  muted,
  volume
});

export const playSong = (playlist, playingIndex) => ({
  type: types.PLAY_SONG,
  playlist,
  playingIndex
});

export const playNextSongFromButton = targetId => (dispatch, getState) => {
  console.log("targetid", targetId);
  const state = getState();
  const currentSongInfoArray = state.music.song;
  dispatch({ type: types.PLAY_NEXT_SONG });
  if (localStorage.historySong) {
    const historyArr = JSON.parse(localStorage.historySong);
    //find currentSong index
    const currentSongIndex = historyArr.indexOf(currentSongInfoArray[0]);
    console.log("currentSongIndex", currentSongIndex);
    let nextId;
    //have to play first music
    if (currentSongIndex === historyArr.length) {
      //dispatch(selectSong(0))
      nextId = historyArr[0];
    } else {
      nextId = historyArr[currentSongIndex + 1];
    }
    console.log("nextId", nextId);
    return axios
      .get(SONG_URL.replace(":id", nextId))
      .then(response => {
        const songInfo = [
          response.data.id,
          response.data.title,
          response.data.artwork_url,
          response.data.duration / 1000
        ];
        console.log("soninfo", songInfo);
        dispatch({
          type: musicActions.SELECT_SONG,
          song: songInfo
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

/*
export const playNextSong = () => (dispatch, getState) => {
  const state = getState();
  const currentSongInfoArray = state.music.song;

  if (localStorage.historySong) {
    const historyArr = JSON.parse(localStorage.historySong);
    //find currentSong index
    const currentSongIndex = historyArr.indexOf(currentSongInfoArray[0]);

    let targetId;
    //have to play first music
    if (currentSongIndex === historyArr.length) {
      //dispatch(selectSong(0))
      targetId = historyArr[0];
    } else {
      targetId = historyArr[currentSongIndex + 1];
    }
    let songInfos;
    axios
      .get(SONG_URL.replace(":id", targetId))
      .then(response => {
        songInfos = response;
        dispatch(
          selectSong(
            songInfos.id,
            songInfos.artwork_url,
            songInfos.title,
            songInfos.duration / 1000
          )
        );
      })
      .catch(err => {
        console.log(err);
      });
    console.log("next song", songInfos);
    
    dispatch(
      selectSong(
        songInfos.id,
        songInfos.artwork_url,
        songInfos.title,
        songInfos.duration / 1000
      )
    );
  } else {
  }
};*/
