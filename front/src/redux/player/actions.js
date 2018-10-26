// EXplain : palylist reducer에서 정보를 받아와서 다음곡 재생하기.
import * as types from "./ActionType"
import * as musicActions from "../music/ActionType"
import axios from "axios"
import { SONG_URL } from "../../App/constants/ApiConstants"

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

export const playSong = (playlist, playingIndex) => ({
  type: types.PLAY_SONG,
  playlist,
  playingIndex
})
export const playNexSong = targetId => (dispatch, getState) => {
  const state = getState()
  const currentSongInfoArray = state.music.song
  const targetPlayList = state.playList.musicList
  console.log("tagetPlayList", state.playList)
  dispatch({ type: types.PLAY_NEXT_SONG })

  if (targetPlayList) {
    //없으면 -1 반환.
    const currentSongIndex = targetPlayList.indexOf(currentSongInfoArray[0])
    console.log("currentSongIndex", currentSongIndex)
    const nextId =
      targetPlayList[(currentSongIndex + 1) % targetPlayList.length]
    console.log("nextId", nextId)
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

export const playPrevSong = targetId => (dispatch, getState) => {
  const state = getState()
  const currentSongInfoArray = state.music.song
  const targetPlayList = state.playList.musicList
  dispatch({ type: types.PLAY_PREV_SONG })

  if (targetPlayList) {
    let nextId
    const currentSongIndex = targetPlayList.indexOf(currentSongInfoArray[0])

    if (currentSongIndex === -1) nextId = targetPlayList[0]
    else nextId = targetPlayList[(currentSongIndex - 1) % targetPlayList.length]

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
