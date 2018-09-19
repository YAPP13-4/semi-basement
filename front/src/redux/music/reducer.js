import * as types from './ActionType';

const music =(
    state = {song:''}, action
) => {
    switch (action.type) {
        case types.SELECT_SONG:
            return {
                ...state,
                song : action.song
            }
        default:
            return state
    }
}

export default music