import * as playerActionType from 'src/redux/player/ActionType.js';
import * as playerAction from 'src/redux/player/actions.js';

describe('/redux/player/actions', () => {
  it('actions.onLoadStart [ON_LOAD_START Test]', () => {
    //Given
    const onLoadStart = {
      type: playerActionType.ON_LOAD_START,
    };
    //When
    //Then
    expect(playerAction.onLoadStart()).toEqual(onLoadStart);
  });
});
