import * as musicActions from 'src/redux/music/actions.js';

describe('/redux/music/actions', () => {
  it('actions.selectSong [SELECT_SONG dispatch Test]', () => {
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
  it('actions.historySong [HISTORY_SONG dispatch Test]', () => {
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
