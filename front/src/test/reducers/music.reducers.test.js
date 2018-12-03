import musicReducer from 'src/redux/music/reducer.js';
import * as musicActions from 'src/redux/music/actions.js';
import { musicInfoMockData, historyMockData } from '../mockData';

describe('Test music Reducer', () => {
  function getInitialState() {
    return {
      song: '',
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
  it('Test loadSongInfoSuccess ', () => {
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
  //뭐랄까 createAction.test.js랑 상당히 비슷한 느낌. ;
  it('Test Select Song', () => {
    //Given
    const mockSong = [
      331622174,
      '지금 뭐 해 (feat. PLANET)',
      'https://i1.sndcdn.com/artworks-000232037629-yspo52-large.jpg',
      186.479,
    ];
    const selectSongAction = {
      type: musicActions.SELECT_SONG,
      song: mockSong,
    };
    const initialState = getInitialState();
    //When
    const result = musicReducer(initialState, selectSongAction);
    //Then
    const expected = {
      ...initialState,
      song: mockSong,
    };
    expect(result).toEqual(expected);
  });
  it('Test Add HistorySuccess reducer', () => {
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
