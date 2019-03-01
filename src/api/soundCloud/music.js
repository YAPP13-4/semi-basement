import { MUSIC_URL, MUSIC_DETAIL_URL, constructUrl } from '../apiConstants';
import axios from 'axios';

export function getCurationMusicList(list) {
  const musicUrl = MUSIC_URL.replace(':list', list);
  return axios.get(musicUrl).then(response => response.data);
}

export function getSoundCloudMusicInfo(url) {
  return axios.get(constructUrl(url)).then(response => {
    return response.data;
  });
}

export function getMusicDetail(musicId) {
  const musicUrl = MUSIC_DETAIL_URL.replace(':id', musicId);
  return axios.get(musicUrl).then(response => response.data);
}
