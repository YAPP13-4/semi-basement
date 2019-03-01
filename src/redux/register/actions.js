const PREFIX = 'REGISTER';

export const LOAD_SOUNDCLOUD_MUSIC_INFO = `${PREFIX}/LOAD_SOUNDCLOUD_MUSIC_INFO`;
export const LOAD_SOUNDCLOUD_MUSIC_INFO_SUCCESS = `${PREFIX}/LOAD_SOUNDCLOUD_MUSIC_INFO_SUCCESS`;
export const LOAD_SOUNDCLOUD_MUSIC_INFO_FAILURE = `${PREFIX}/LOAD_SOUNDCLOUD_MUSIC_INFO_FAILURE`;

export const REGIST_SOUNDCLOUD_MUSIC = `${PREFIX}/REGIST_SOUNDCLOUD_MUSIC`;
export const REGIST_SOUNDCLOUD_MUSIC_SUCCESS = `${PREFIX}/REGIST_SOUNDCLOUD_MUSIC_SUCCESS`;
export const REGIST_SOUNDCLOUD_MUSIC_FAILURE = `${PREFIX}/REGIST_SOUNDCLOUD_MUSIC_FAILURE`;

export const RESET_REGIST_MUSIC_STATE = `${PREFIX}/RESET_REGIST_MUSIC_STATE`;

export const loadSoundcloudMusicInfo = url => ({
  type: LOAD_SOUNDCLOUD_MUSIC_INFO,
  url
})

export const loadSoundcloudMusicInfoSuccess = data => ({
  type: LOAD_SOUNDCLOUD_MUSIC_INFO_SUCCESS,
  data
})

export const loadSoundcloudMusicInfoFailure = () => ({
  type: LOAD_SOUNDCLOUD_MUSIC_INFO_FAILURE
})

export const registSoundcloudMusic = music => ({
  type: REGIST_SOUNDCLOUD_MUSIC,
  music
})

export const registSoundcloudMusicSuccess = () => ({
  type: REGIST_SOUNDCLOUD_MUSIC_SUCCESS
})

export const registSoundcloudMusicFailure = () => ({
  type: REGIST_SOUNDCLOUD_MUSIC_FAILURE
})

export const resetRegistMusicState = () => ({
  type: RESET_REGIST_MUSIC_STATE
})