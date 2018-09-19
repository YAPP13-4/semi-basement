import * as types from './ActionType';

export const selectSong = song=> ({
        type: types.SELECT_SONG,
        song : song
})

export const landing = (landing_state) => ({
    type: types.LANDING,
    landing_state
}) 