import { CONTENT_TYPE, REQUEST_METHOD } from './constants'

global.DEFAULTS = {
  prefix: '',
  method: REQUEST_METHOD.GET,
  contentType: CONTENT_TYPE.APPLICATION_JSON,
  fallback: undefined,
  returnType: 'json',
  headers: {
    // 'X-Requested-With': 'XmlHttpRequest'
  },
  class: {
    init: undefined,
    setPrefix: undefined,
    setPath: undefined,
    setData: undefined,
    setHeaders: undefined,
    setMethod: undefined,
    setContentType: undefined,
    setReturnType: undefined,
    setResponse: undefined,
    setFallback: undefined
  }
}

function configDefaults (configFunction) {
  configFunction(global.DEFAULTS)
}

function getDefaults () {
  return global.DEFAULTS
}

export {
  configDefaults, getDefaults
}
