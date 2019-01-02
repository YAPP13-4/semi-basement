const API_HOSTNAME = '//api.soundcloud.com';
export const CLIENT_ID = 'a281614d7f34dc30b665dfcaa3ed7505';

const constructUrl = url =>
  `${API_HOSTNAME}${url}${
    url.indexOf('?') === -1 ? '?' : '&'
  }client_id=${CLIENT_ID}`;
export const resolveUrl = musicUrl =>
  `${API_HOSTNAME}/resolve.json?url=${musicUrl}&client_id=${CLIENT_ID}`;
export const MUSIC_URL = constructUrl('/tracks/:id');
export const MUSIC_COMMENTS_URL = constructUrl('/tracks/:id/comments');
export const MUSICS_URL = constructUrl(
  '/tracks?linked_partitioning=1&limit=50&offset=0',
);
export const USER_URL = constructUrl('/users/:id');
export const USER_MUSICS_URL = constructUrl('/users/:id/tracks');

//test
export const MUSIC_STREAM_URL = constructUrl('/tracks/:id/stream?');

export const withClientId = url => `${url}?client_id=${CLIENT_ID}`;
