import * as types from '../actions/ActionType';

// 초기 상태를 정의합니다
const initialState = {
    song: '',
    landing_state : 1
};

function selectSong(state=initialState, action) {
    switch (action.type) {
        case types.SELECT_SONG:
            console.log("ssold")
            return {
                ...state,
                song: action.song
            };
        case types.HISTORY_SONG:
            console.log("history reducer1")
            return { 
                ...state,
                arr: [...state.arr, action.newItem]
            }
        default:
            return state;
    }
};

export default selectSong