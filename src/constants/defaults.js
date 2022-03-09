import CONTENT_TYPE from './content-type'
global.DEFAULTS = {
  prefix: '',
  method: 'GET',
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

export default global.DEFAULTS
