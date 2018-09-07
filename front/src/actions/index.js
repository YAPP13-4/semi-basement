import * as types from './ActionType';

export function selectSong(song){
    return {
        type: types.SELECT_SONG,
        song
    }
};

export const landing = (landing_state) => ({
    type: types.LANDING,
    landing_state
}) 