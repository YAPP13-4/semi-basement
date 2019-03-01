let API_HOSTNAME = process.env.REACT_APP_API_HOSTNAME;

export const constructUrl = url => `${API_HOSTNAME}${url}`;
export const MUSIC_URL = constructUrl('/musics');
export const MUSIC_DETAIL_URL = constructUrl('/musics/:id');
