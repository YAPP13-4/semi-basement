const PREFIX = 'META';

export const EXAMPLE = `${PREFIX}/EXAMPLE`;
export const EXAMPLE_REQUEST = `${PREFIX}/EXAMPLE_REQUEST`;
export const EXAMPLE_SUCCESS = `${PREFIX}/EXAMPLE_SUCCESS`;
export const EXAMPLE_FAILURE = `${PREFIX}/EXAMPLE_FAILURE`;
export const TOGGLE_HISTORY = `${PREFIX}/TOGGLE_HISTORY`;
export const TOGGLE_MYPLAYER = `${PREFIX}/TOGGLE_MYPLAYER`;
export const SHOW_GNB = `${PREFIX}/SHOW_GNB`;

export function example() {
  return {
    type: EXAMPLE,
  };
}

export function exampleRequest() {
  return {
    type: EXAMPLE_REQUEST,
  };
}

export function exampleSuccess() {
  return {
    type: EXAMPLE_SUCCESS,
  };
}

export function exampleFailure(error) {
  return {
    type: EXAMPLE_FAILURE,
    error,
  };
}

export function toggleHistory() {
  return {
    type: TOGGLE_HISTORY,
  };
}

export function toggleMyplayer() {
  return {
    type: TOGGLE_MYPLAYER,
  };
}

export function toggleGNB() {
  return {
    type: SHOW_GNB,
  };
}
