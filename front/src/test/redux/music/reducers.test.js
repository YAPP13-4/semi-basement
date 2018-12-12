import musicReducer from 'src/redux/music/reducer.js';
import * as musicActions from 'src/redux/music/actions.js';
import { musicInfoMockData, historyMockData } from '../../mockData';

function getInitialState() {
  return {
    playingMusic: null,
    loading: false,
    infoLoading: false,
    musicInfo: null,
    recommendMusicInfo1: null,
    recommendMusicInfo2: null,
    songDetail: null,
    historySong: [],
    searchKeyword: '',
    searchResult: null,
  };
}

describe('redux/music [LOAD DATA]', () => {
  it('actions.LOAD_SONG_INFO_SUCCESS, [LOAD_MUSIC_INFO_MAINPAGE]', () => {
    //Given
    const mockData = musicInfoMockData;
    const loadSongSuccessAction = {
      type: musicActions.LOAD_SONG_INFO_SUCCESS,
      data: [mockData],
    };
    const initialState = getInitialState();

    //When
    const result = musicReducer(initialState, loadSongSuccessAction);

    //Then
    const expected = {
      ...initialState,
      infoLoading: false,
      musicInfo: [mockData],
    };
    expect(result).toEqual(expected);
  });
  it('actions.HISTORY_SONG_SUCCESS, [ADD_HISTORYDATA]', () => {
    //Given
    const initialState = getInitialState();
    const addHistoryAction = {
      type: musicActions.HISTORY_SONG_SUCCESS,
      data: [historyMockData],
    };
    //When
    const result = musicReducer(initialState, addHistoryAction);
    //Then
    const expected = {
      ...initialState,
      historySong: [historyMockData],
    };
    expect(result).toEqual(expected);
  });
});
describe('redux/music [LOAD DATA]', () => {
  it('actions.SELECT_SONG, [CHANGE_MUSIC_WHEN_CLICK]', () => {
    //Given
    const mockSong = {
      songId: 331622174,
      title: '지금 뭐 해 (feat. PLANET)',
      singer: 'Bluite',
      artworkUrl:
        'https://i1.sndcdn.com/artworks-000232037629-yspo52-large.jpg',
      duration: 186.479,
    };
    const selectSongAction = {
      type: musicActions.SELECT_SONG,
      playingMusic: mockSong,
    };
    const initialState = getInitialState();
    //When
    const result = musicReducer(initialState, selectSongAction);
    //Then
    const expected = {
      ...initialState,
      playingMusic: mockSong,
    };
    expect(result).toEqual(expected);
  });
});
