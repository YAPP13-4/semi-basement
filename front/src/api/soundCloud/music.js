import { SONG_URL, resolveUrl } from '../apiConstants';
import axios from 'axios';

export function getSoundCloudSongInfo(url) {
  //debugger
  return axios
    .get(resolveUrl(url))
    .then(response => response.data)
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    });
}

export function getSoundCloudSong(songId) {
  const songUrl = SONG_URL.replace(':id', songId);
  return axios
    .get(songUrl)
    .then(res => res)
    .then(err => err);
}
