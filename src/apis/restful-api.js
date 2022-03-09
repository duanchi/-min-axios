import BaseApi from './base-api'
import typeOf from 'typeof'

export default
class RestfulApi extends BaseApi {
  $setPrefix (prefix, parameters, values, options) {
    if (this.DEFAULTS.class.setPrefix) {
      return this.DEFAULTS.class.setPrefix(prefix, parameters, values, options)
    }
    return prefix
  }

  $setPath (methodName, parameters, values, options) {
    if (this.DEFAULTS.class.setPath) {
      return this.DEFAULTS.class.setPath(methodName, parameters, values, options)
    }
    let path = ''
    if (options.path) {
      path = options.path
    } else if (options.path !== '') {
      path = methodName
    }
    path = (options.basepath === '' ? '' : '/' + options.basepath) + '/' + path
    if (values[parameters.indexOf('id')]) {
      path += '/' + values[parameters.indexOf('id')]
    } else if (path.includes('?')) {
    } else {
      path += '/'
    }

    return path.replace(/\/+/g, '/')
  }

  $setData (methodName, parameters, values, options) {
    if (this.DEFAULTS.class.setData) {
      return this.DEFAULTS.class.setData(methodName, parameters, values, options)
    }
    const data = {}
    for (const n in parameters) {
      if (parameters[n] === 'data') {
        return values[n]
      }
      if (typeOf(parameters[n]) === 'object') {
        for (const k in parameters[n]) {
          if (![undefined, null, '', '-'].includes(parameters[n][k])) {
            data[parameters[n][k]] = values[n]
          }
        }
      } else {
        data[parameters[n]] = values[n]
      }
    }

    return data
  }

  $setHeaders (headers, parameters, values, options) {
    if (this.DEFAULTS.class.setHeaders) {
      return this.DEFAULTS.class.setHeaders(headers, parameters, values, options)
    }

    if (this.DEFAULTS.class.getToken) {
      const token = this.DEFAULTS.class.getToken()

      if (token) {
        headers.Authorization = 'Bearer ' + token
      }
    }

    return super.$setHeaders(headers, parameters, values, options)
  }

  $setContentType (contentType, parameters, values, options) {
    if (this.DEFAULTS.class.setContentType) {
      return this.DEFAULTS.class.setContentType(contentType, parameters, values, options)
    }

    if (contentType === 'multipart/form-data') {
      return undefined
    }
  }

  $setReturnType (returnType, parameters, values, options) {
    if (this.DEFAULTS.class.setReturnType) {
      return this.DEFAULTS.class.setReturnType(returnType, parameters, values, options)
    }
  }

  $setResponse (promise, resolve, reject) {
    if (this.DEFAULTS.class.setResponse) {
      return this.DEFAULTS.class.setResponse(promise, resolve, reject)
    }

    return promise.then(
      (response) => {
        if (response?.data?.status === true || response?.data?.message === 'Ok') {
          resolve(response.data.data)
        } else if (response.status === 204) {
          resolve(null)
        } else {
          reject(response.data)
        }
      }).catch((error) => {
      reject(error.response)
    }
    )
  }
}
