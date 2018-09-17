// example
const MODULE_NAME = `META`

export const EXAMPLE = `${MODULE_NAME}/EXAMPLE`
export const EXAMPLE_REQUEST = `${MODULE_NAME}/EXAMPLE_REQUEST`
export const EXAMPLE_SUCCESS = `${MODULE_NAME}/EXAMPLE_SUCCESS`
export const EXAMPLE_FAILURE = `${MODULE_NAME}/EXAMPLE_FAILURE`

export function example() {
  return {
    type: EXAMPLE
  }
}

export function exampleRequest() {
  return {
    type: EXAMPLE_REQUEST
  }
}

export function exampleSuccess() {
  return {
    type: EXAMPLE_SUCCESS
  }
}

export function exampleFailure(error) {
  return {
    type: EXAMPLE_FAILURE,
    error
  }
}
