import { overrideFunctionWithRequest } from '../executor'

export function Restful (options) {
  return (Target) => {
    // return new Target(options)

    /*if (options && typeof options === 'object') {
      console.log(Target.$options)
      for (const [k, v] of Object.entries(options)) {
        Target.$options[k] = v
      }
    }*/
    /* return class extends Target {
      constructor() {
        super(options);
      }
    } */
    /* const name = options.name || Target.name
    if (RESTFUL_OPTIONS_MAPPING[name]) {
      RESTFUL_OPTIONS_MAPPING[name].options = options
    } else {
      RESTFUL_OPTIONS_MAPPING[name] = {
        options,
        methods: {}
      }
    } */
    return () => {
      return new Target(options)
    }

    // Target.$options = Object.assign({}, options)
  }
}

export function RestfulRequest (options) {
  return (target, name, descriptor) => {
    return overrideFunctionWithRequest(target, name, descriptor, options)
  }
}
