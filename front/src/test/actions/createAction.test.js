import * as musicActions from 'src/redux/music/actions.js';
import * as playerActionType from 'src/redux/player/ActionType.js';
import * as playerAction from 'src/redux/player/actions.js';

describe('/actions', () => {
  it('Test playedSong Action', () => {
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
    //When

    //Then
    expect(musicActions.selectSong(mockSong)).toEqual(selectSongAction);
  });
  it('Test onLoadStart', () => {
    //Given
    const onLoadStart = {
      type: playerActionType.ON_LOAD_START,
    };
    //When
    //Then
    expect(playerAction.onLoadStart()).toEqual(onLoadStart);
  });
  it('Test addHistory', () => {
    //Given
    const addHistory = {
      type: musicActions.HISTORY_SONG,
      songId: 331622174,
    };
    //When
    //Then
    expect(musicActions.historySong(331622174)).toEqual(addHistory);
  });
});
