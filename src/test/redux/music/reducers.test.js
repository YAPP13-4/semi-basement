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
    musicDetail: null,
    historyMusic: [],
    searchKeyword: '',
    searchResult: null,
  };
}

describe('redux/music [LOAD DATA]', () => {
  it('actions.LOAD_MUSIC_INFO_SUCCESS, [LOAD_MUSIC_INFO_MAINPAGE]', () => {
    //Given
    const mockData = musicInfoMockData;
    const loadMusicSuccessAction = {
      type: musicActions.LOAD_MUSIC_INFO_SUCCESS,
      data: [mockData],
    };
    const initialState = getInitialState();

    //When
    const result = musicReducer(initialState, loadMusicSuccessAction);

    //Then
    const expected = {
      ...initialState,
      infoLoading: false,
      musicInfo: [mockData],
    };
    expect(result).toEqual(expected);
  });
  it('actions.HISTORY_MUSIC_SUCCESS, [ADD_HISTORYDATA]', () => {
    //Given
    const initialState = getInitialState();
    const addHistoryAction = {
      type: musicActions.HISTORY_MUSIC_SUCCESS,
      data: [historyMockData],
    };
    //When
    const result = musicReducer(initialState, addHistoryAction);
    //Then
    const expected = {
      ...initialState,
      historyMusic: [historyMockData],
    };
    expect(result).toEqual(expected);
  });
});
describe('redux/music [LOAD DATA]', () => {
  it('actions.SELECT_MUSIC, [CHANGE_MUSIC_WHEN_CLICK]', () => {
    //Given
    const mockMusic = {
      musicId: 331622174,
      title: '지금 뭐 해 (feat. PLANET)',
      musician: 'Bluite',
      artworkUrl:
        'https://i1.sndcdn.com/artworks-000232037629-yspo52-large.jpg',
      duration: 186.479,
    };
    const selectMusicAction = {
      type: musicActions.SELECT_MUSIC,
      playingMusic: mockMusic,
    };
    const initialState = getInitialState();
    //When
    const result = musicReducer(initialState, selectMusicAction);
    //Then
    const expected = {
      ...initialState,
      playingMusic: mockMusic,
    };
    expect(result).toEqual(expected);
  });
});
