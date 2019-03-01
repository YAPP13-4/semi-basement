import axios from 'axios';

export function getPlaylist(apiPath) {
  return axios
    .get(`http://localhost:6508/musics/${apiPath}`)
    .then(res => {
      return res.data
    })
    .catch(({ response }) => {
      throw response.data;
    });
}
