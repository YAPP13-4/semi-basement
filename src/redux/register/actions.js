const PREFIX = 'REGISTER';

export const LOAD_SOUNDCLOUD_MUSIC_INFO = `${PREFIX}/LOAD_SOUNDCLOUD_MUSIC_INFO`;
export const LOAD_SOUNDCLOUD_MUSIC_INFO_SUCCESS = `${PREFIX}/LOAD_SOUNDCLOUD_MUSIC_INFO_SUCCESS`;
export const LOAD_SOUNDCLOUD_MUSIC_INFO_FAILURE = `${PREFIX}/LOAD_SOUNDCLOUD_MUSIC_INFO_FAILURE`;

export const loadSoundcloudMusicInfo = (url) => ({
  type: LOAD_SOUNDCLOUD_MUSIC_INFO,
  url
})

export const loadSoundcloudMusicInfoSuccess = () => ({
  type: LOAD_SOUNDCLOUD_MUSIC_INFO_SUCCESS
})

export const loadSoundcloudMusicInfoFailure = () => ({
  type: LOAD_SOUNDCLOUD_MUSIC_INFO_FAILURE
})