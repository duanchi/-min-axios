import { getDefaults } from '../config'

class ApiClassOptions {
    path = ''
    basepath = ''
    prefix = ''
    method = ''
    contentType = ''
    returnType = ''
  constructor (DEFAULTS) {
    this.prefix = DEFAULTS.prefix
    this.method = DEFAULTS.method
    this.contentType = DEFAULTS.contentType
    this.returnType = DEFAULTS.returnType
  }
}

class BaseApi {
  DEFAULTS = {}
  $name = null
  $options = {}
  $methods = {}

  constructor (options) {
    this.DEFAULTS = getDefaults()
    // this.$options = Object.assign(new ApiClassOptions(this.DEFAULTS), this.$options)
    if (options) {
      this.$setOptions(options)
    }
    this.$name = options.name || Object.getPrototypeOf(this).constructor.name
    this.$init(this)
  }

  $setOptions (options) {
    this.$options = Object.assign({}, this.DEFAULTS, options)
    this.$options.basepath = options.path || this.DEFAULTS.path || ('/' + this.$name)
    this.$options.path = ''
  }

  $init(target) {
    if (this.DEFAULTS.class.init) {
      this.DEFAULTS.class.init(target)
    }
  }

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
    return ''
  }

  $setData (methodName, parameters, values, options) {
    if (this.DEFAULTS.class.setData) {
      return this.DEFAULTS.class.setData(methodName, parameters, values, options)
    }
    return ''
  }

  $setHeaders (headers, parameters, values, options) {
    if (this.DEFAULTS.class.setHeaders) {
      return this.DEFAULTS.class.setHeaders(headers, parameters, values, options)
    }
    return headers || {}
  }

  $setMethod (method, parameters, values, options) {
    if (this.DEFAULTS.class.setMethod) {
      return this.DEFAULTS.class.setMethod(method, parameters, values, options)
    }
    return method
  }

  $setContentType (contentType, parameters, values, options) {
    if (this.DEFAULTS.class.setContentType) {
      return this.DEFAULTS.class.setContentType(contentType, parameters, values, options)
    }
    return contentType
  }

  $setReturnType (returnType, parameters, values, options) {
    if (this.DEFAULTS.class.setReturnType) {
      return this.DEFAULTS.class.setReturnType(returnType, parameters, values, options)
    }
    return returnType
  }

  $setResponse (promise, resolve, reject) {
    if (this.DEFAULTS.class.setResponse) {
      return this.DEFAULTS.class.setResponse(promise, resolve, reject)
    }
    return resolve(promise)
  }

  $setFallback () {
    if (this.DEFAULTS.class.setFallback) {
      return this.DEFAULTS.class.setFallback()
    }
  }
}

export default BaseApi
