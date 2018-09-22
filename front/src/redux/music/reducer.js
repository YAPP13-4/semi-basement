import * as types from './ActionType';

const music =(
    state = {   song:'',
                historySong: []
            }, 
    action
) => {
    switch (action.type) {
        case types.SELECT_SONG:
            return {
                ...state,
                song : action.song
            }
        case types.HISTORY_SONG:
           return { 
                ...state,
                historySong: [...state.historySong, action.historySong]
            }       
        default:
            return state
    }
}

export default music