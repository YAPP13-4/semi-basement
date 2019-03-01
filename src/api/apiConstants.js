const API_HOSTNAME = 'https://seba-api.cf';

export const constructUrl = url => `${API_HOSTNAME}${url}`;
export const MUSIC_URL = constructUrl('/musics/:list');
export const MUSIC_DETAIL_URL = constructUrl('/musics/:id');
