// EXplain : palylist reducer에서 정보를 받아와서 다음곡 재생하기.

import * as types from "./ActionType"
import * as musicActions from "../music/actions"
import axios from "axios"
import { SONG_URL } from "../../App/constants/ApiConstants"

const MODULE_NAME = `META`
export const CHANGE_MYPLAYER_CURRENT_TIME = `${MODULE_NAME}/CHANGE_MYPLAYER_CURRENT_TIME`
export const CHANGE_MYPLAYER_VOLUME = `${MODULE_NAME}/CHANGE_MYPLAYER_VOLUME`

export const onLoadedMetadata = duration => ({
  type: types.ON_LOADED_METADATA,
  duration
})
export const onLoadStart = () => ({
  type: types.ON_LOAD_START
})

export const onPause = () => ({
  type: types.ON_PAUSE
})

export const onPlay = () => ({
  type: types.ON_PLAY
})

export const onTimeUpdate = currentTime => ({
  type: types.ON_TIME_UPDATE,
  currentTime
})

export const onVolumeChange = (muted, volume) => ({
  type: types.ON_VOLUME_CHANGE,
  muted,
  volume
})

export function changeMyPlayerCurrentTime(myPlayerCurrentTime) {
  return {
    type: CHANGE_MYPLAYER_CURRENT_TIME,
    myPlayerCurrentTime
  }
}

export function changeMyPlayerVolume(myPlayerVolume) {
  return {
    type: CHANGE_MYPLAYER_VOLUME,
    myPlayerVolume
  }
}
export function toggleShuffle() {
  return {
    type: types.TOGGLE_SHUFFLE
  }
}

export const playSong = (playlist, playingIndex) => ({
  type: types.PLAY_SONG,
  playlist,
  playingIndex
})
function randomIndex(currentIndex, maxIndex) {
  const nextIndex = Math.floor(Math.random() * (maxIndex - 1) + 0)
  console.log("next randomindex ", nextIndex)
  if (currentIndex === nextIndex) {
    return randomIndex(currentIndex, maxIndex)
  }
  return nextIndex
}
export const playNexSong = targetId => (dispatch, getState) => {
  const state = getState()
  const isShuffle = state.player.shuffle
  const currentSongInfoArray = state.music.song
  const targetPlayList = state.playList.musicList
  dispatch({ type: types.PLAY_NEXT_SONG })

  if (targetPlayList) {
    //없으면 -1 반환.
    const currentSongIndex = targetPlayList.indexOf(currentSongInfoArray[0])
    const nextId = isShuffle
      ? targetPlayList[randomIndex(currentSongIndex, targetPlayList.length)]
      : targetPlayList[(currentSongIndex + 1) % targetPlayList.length]

    return axios
      .get(SONG_URL.replace(":id", nextId))
      .then(response => {
        const songInfo = [
          response.data.id,
          response.data.title,
          response.data.artwork_url,
          response.data.duration / 1000
        ]
        console.log("soninfo", songInfo)
        dispatch({
          type: musicActions.SELECT_SONG,
          song: songInfo
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const playPrevSong = () => (dispatch, getState) => {
  const state = getState()
  const currentSongInfoArray = state.music.song
  const targetPlayList = state.playList.musicList
  dispatch({ type: types.PLAY_PREV_SONG })

  if (targetPlayList) {
    let nextId
    const currentSongIndex = targetPlayList.indexOf(currentSongInfoArray[0])
    const isShuffle = state.player.shuffle
    if (currentSongIndex === -1) nextId = targetPlayList[0]
    else {
      nextId = isShuffle
        ? targetPlayList[randomIndex(currentSongIndex, targetPlayList.length)]
        : targetPlayList[(currentSongIndex - 1) % targetPlayList.length]
    }

    return axios
      .get(SONG_URL.replace(":id", nextId))
      .then(response => {
        const songInfo = [
          response.data.id,
          response.data.title,
          response.data.artwork_url,
          response.data.duration / 1000
        ]
        console.log("soninfo", songInfo)
        dispatch({
          type: musicActions.SELECT_SONG,
          song: songInfo
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
