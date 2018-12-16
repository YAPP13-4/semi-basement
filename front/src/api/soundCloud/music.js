import { SONG_URL, resolveUrl } from '../apiConstants';
import axios from 'axios';

export function getSoundCloudSongInfo(url) {
  return axios.get(resolveUrl(url)).then(response => response.data);
}

export function getSoundCloudSong(songId) {
  const songUrl = SONG_URL.replace(':id', songId);
  return axios.get(songUrl).then(response => response.data);
}
