import * as types from '../actions/ActionType';

// 초기 상태를 정의합니다
const initialState = {
    song: '',
    landing_state : 1
};

function selectSong(state=initialState, action) {
    switch (action.type) {
        case types.SELECT_SONG:
            return {
                ...state,
                song: action.song
            };
        case types.LANDING:
            return {
                ...state,
                landing_state : action.landing_state
            }
        default:
            return state;
    }
};

export default selectSong