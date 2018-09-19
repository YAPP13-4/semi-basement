import * as types from './ActionType';
export function selectSong(song) {
    return {
        type: types.SELECT_SONG,
        song
    }
}
/*
export const selectSong = song=> ({
    type: types.SELECT_SONG,
    song
})*/