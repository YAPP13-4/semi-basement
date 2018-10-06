import { SONG_URL } from '../apiConstants'
import axios from 'axios'

export function getSoundCloudSong(songId) {
  const songUrl = SONG_URL.replace(':id', songId)

  return axios
    .get(songUrl)
    .then(res => res)
    .then(err => err)
}
