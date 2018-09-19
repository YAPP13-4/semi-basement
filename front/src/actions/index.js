import * as types from './ActionType';

export function selectSong(song){
    return {
        type: types.SELECT_SONG,
        song
    }
};
export function heardSong(heardSong) {
    return {
        type: types.HEARD_SONG,
        heardSong
    }
}
export const landing = (landing_state) => ({
    type: types.LANDING,
    landing_state
}) 