import { SONG_URL, resolveUrl } from '../apiConstants';
import axios from 'axios';

export function getSoundCloudSongInfo(url) {
  //debugger
  return axios
    .get(resolveUrl(url))
    .then(response => response.data)
    .catch(err => err);
}

export function getSoundCloudSong(songId) {
  console.log('get info ', songId);
  const songUrl = SONG_URL.replace(':id', songId);

  return axios.get(songUrl).then(res => res.data);
}
