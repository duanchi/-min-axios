import axios from 'axios'
import { buildQuery, parseParameterMapping } from './utils'
import typeOf from 'typeof'
import { getDefaults } from './config'

function overrideFunctionWithRequest (target, name, rawDescriptor, options, overrideFunction) {
  const rawExecuteFunction = rawDescriptor.value
  rawDescriptor.value = function () {
    const DEFAULTS = getDefaults()
    const args = arguments
    const parameters = options.parameters || []
    const requestOptions = Object.assign({}, this.$options, options)
    requestOptions.prefix = options.prefix || this.$options.prefix ||  DEFAULTS.prefix
    requestOptions.contentType = requestOptions.contentType ||  DEFAULTS.contentType
    requestOptions.basepath = requestOptions.basepath || this.$options.basepath
    const preParsedOptions = Object.assign({}, requestOptions)
    requestOptions.path = parseParameterMapping(
      this.$setPath(name, parameters, args, preParsedOptions),
      parameters,
      args
    )
    requestOptions.prefix = this.$setPrefix(requestOptions.prefix ||  DEFAULTS.prefix, parameters, args, requestOptions)
    requestOptions.method = this.$setMethod(requestOptions.method ||  DEFAULTS.method, parameters, args, requestOptions)
    requestOptions.contentType = this.$setContentType(requestOptions.contentType ||  DEFAULTS.contentType, parameters, args, requestOptions)
    requestOptions.fallback = requestOptions.fallback ||  DEFAULTS.fallback
    requestOptions.returnType = this.$setReturnType(requestOptions.returnType ||  DEFAULTS.returnType, parameters, args, requestOptions)
    requestOptions.headers = this.$setHeaders(requestOptions.headers ||  DEFAULTS.headers || {}, parameters, args, requestOptions)

    if (overrideFunction) {
      overrideFunction()
    }
    const rawResult = httpRequest(this.$setData(name, parameters, args, requestOptions), requestOptions, this)

    let result = new Promise((resolve, reject) => {
      this.$setResponse(rawResult, resolve, reject)
    })

    if (typeOf(requestOptions.fallback) === 'function') {
      result = result.catch((e) => {
        return new Promise((resolve, reject) => {
          requestOptions.fallback(e, resolve, reject)
        })
      })
    }

    if (!isEmptyFunction(rawExecuteFunction)) {
      const executeResult = rawExecuteFunction.apply(this, args)

      switch (typeOf(executeResult)) {
        case 'promise':
          result = result.then((data) => {
            return executeResult.then(func => func(data))
          })
          break
        case 'function':
          result = result.then((data) => {
            return executeResult(data)
          })
          break
        default:
          result = executeResult
      }
    }

    return result
  }
  return rawDescriptor
}

function httpRequest (data, options, target) {
  let url = `${options.prefix}/${options.path}`.replace(/\/+/g, '/')

  if (Object.keys(data).length > 0 && !['POST', 'PUT', 'PATCH'].includes(options.method)) {
    const joinString = (url.includes('?') ? '&' : '?')
    url += joinString + buildQuery(data)
  }

  return axios({
    url,
    method: options.method,
    responseType: options.returnType,
    data,
    headers: options.headers
  })
}

function isEmptyFunction(func){
  // Get the string from the function;
  var funcString = func.toString();
  // Cut off the part before the actual content of the function
  funcString = funcString.substr(funcString .indexOf(')'))
    .replace(/function|[(){};]/g,'') // remove the function keyword, and the following characters: (){};
    .trim();                         // remove any leading / trailing whitespaces and
  return funcString === '';            //check if it's an empty string.
}

export { overrideFunctionWithRequest }
