import axios from 'axios'

export function getMusicInfo(url) {
    return axios.get(`http://localhost:6508/musics/register-form?url=${url}`)
    .then(res => res.data)
    .catch(({response}) => {
        throw response.data;
    })
}

export function postMusic(musicInfo) {
    return axios.post(`http://localhost:6508/musics`, musicInfo)
    .then(res=>res)
    .catch(err=>err)
}