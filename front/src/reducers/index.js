import * as types from '../actions/ActionType';

// 초기 상태를 정의합니다
const initialState = {
    song: '',
};

function selectSong(state=initialState, action) {
    switch (action.type) {
        case types.SELECT_SONG:
            return {
                ...state,
                song: action.song
            };
        default:
            return state;
    }
};

export default selectSong