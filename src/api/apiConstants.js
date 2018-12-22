const API_HOSTNAME = '//api.soundcloud.com';
export const CLIENT_ID = 'a281614d7f34dc30b665dfcaa3ed7505';

const constructUrl = url => `${API_HOSTNAME}${url}${url.indexOf('?') === -1 ? '?' : '&'}client_id=${CLIENT_ID}`;
export const resolveUrl = songUrl => `${API_HOSTNAME}/resolve.json?url=${songUrl}&client_id=${CLIENT_ID}`
export const SONG_URL = constructUrl('/tracks/:id');
export const SONG_COMMENTS_URL = constructUrl('/tracks/:id/comments');
export const SONGS_URL = constructUrl('/tracks?linked_partitioning=1&limit=50&offset=0');
export const USER_URL = constructUrl('/users/:id');
export const USER_SONGS_URL = constructUrl('/users/:id/tracks');