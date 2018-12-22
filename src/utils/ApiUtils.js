import camelize from "camelize"

export const callApi = (url, options) =>
  fetch(url, options)
    .then(
      response =>
        response.ok ? response.json() : Promise.reject(response.text()),
      error => Promise.reject(error)
    )
    .then(json => ({ json: camelize(json) }), error => ({ error }))
    .catch(error => ({ error }))
