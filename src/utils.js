import typeOf from 'typeof'

function cleanArray (actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

function buildQuery (data) {
  if (!data) { return '' }
  return cleanArray(Object.keys(data).map((key) => {
    if (data[key] === undefined) { return '' }
    return encodeURIComponent(key) + '=' +
            encodeURIComponent(data[key])
  })).join('&')
}

function parseParameterMapping (strings, parameters, values) {
  strings = strings.replace(/[$#:]\{(.+?)\}/g, (match, p1) => {
    return getValueFromParameters(p1, parameters, values)
  })

  return strings
}

function getValueFromParameters (key, parameters, value) {
  for (const n in parameters) {
    if (typeOf(parameters[n]) === 'object' && parameters[n][key]) {
      return value[n]
    } else if (parameters[n] === key) {
      return value[n]
    }
  }

  return ''
}

export { buildQuery, parseParameterMapping }
