import * as musicActions from 'src/redux/music/actions.js';

describe('/redux/music/actions', () => {
  it('actions.selectMusic [SELECT_MUSIC dispatch Test]', () => {
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
    //When

    //Then
    expect(musicActions.selectMusic(mockMusic)).toEqual(selectMusicAction);
  });
  it('actions.historyMusic [HISTORY_MUSIC dispatch Test]', () => {
    //Given
    const addHistory = {
      type: musicActions.HISTORY_MUSIC,
      musicId: 331622174,
    };
    //When
    //Then
    expect(musicActions.historyMusic(331622174)).toEqual(addHistory);
  });
});
