import axios from 'axios'
import {MUSIC_URL} from 'src/api/apiConstants';

export function getMusicInfo(url) {
  return axios.get(`${MUSIC_URL}/register-form?url=${url}`)
    .then(res => res.data)
    .catch(({response}) => {
      throw response.data;
    })
}

export function postMusic(musicInfo) {
  return axios.post(MUSIC_URL, musicInfo)
    .then(res => res)
    .catch(err => {
      throw err
    })
}