const API_HOSTNAME = 'https://seba-api.cf';

export const constructUrl = url => `${API_HOSTNAME}${url}`;
// export const resolveUrl = musicUrl => `${API_HOSTNAME}/resolve.json?url=${musicUrl}&client_id=${CLIENT_ID}`
export const MUSIC_URL = constructUrl('/musics/:list');
export const MUSIC_DETAIL_URL = constructUrl('/musics/:id');
// export const MUSIC_COMMENTS_URL = constructUrl('/tracks/:id/comments');
// export const MUSICS_URL = constructUrl('/tracks?linked_partitioning=1&limit=50&offset=0');
// export const USER_URL = constructUrl('/users/:id');
// export const USER_MUSICS_URL = constructUrl('/users/:id/tracks');
