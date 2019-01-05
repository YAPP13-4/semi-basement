import { MUSIC_URL, resolveUrl } from '../apiConstants';
import axios from 'axios';

// 필요할까..?
export function getSoundCloudMusicInfo(url) {
  return axios.get(resolveUrl(url)).then(response => response.data);
}

export function getSoundCloudMusic(musicId) {
  const musicUrl = MUSIC_URL.replace(':id', musicId);
  return axios.get(musicUrl).then(response => response.data);
}
