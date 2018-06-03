'use strict'

/* Check if a string is empty or blank.
  ARGS:
    str: (string)

  RETURN:
    (boolean) true if empty or blank / false otherwise
*/
const isBlank = str => {
  if (!str || str.length === 0 || /^[^\S]+$/.test(str)) return true
  else return false
}

/* Check if a parameter is undefined.
  ARGS:
    param: (any)

  RETURN:
    (boolean) true if undefined / false otherwise
*/
const isUndefined = param => {
  return typeof param === 'undefined'
}

/* Check if a property of an object is defined
  ARGS:
    obj: (object)
    prop: (string) path to the property to check

  RETURN:
    (boolean) true if defined / false otherwise
*/
const isPropDefined = (obj, prop) => {
  let keys = Array.isArray(prop) ? prop : prop.split('.')
  if (keys.length === 0) return true

  if (!isUndefined(obj[keys[0]])) {
    return isPropDefined(obj[keys[0]], keys.slice(1))
  } else {
    return false
  }
}

/* Check if properties of an object are defined
  ARGS:
    obj: (object)
    props: (string | array) string(s) of properties to check

  RETURN:
    (boolean) true if defined / false otherwise
*/
const arePropsDefined = (obj, props) => {
  let keys = typeof props === 'string' ? [props] : props
  return keys.every(key => {
    return isPropDefined(obj, key)
  })
}

/* Get the property of an object
  ARGS:
    obj: (object)
    path: (string) path to the property to check

  RETURN:
    The prop value, undefined otherwise
*/
const getProp = (obj, path) => {
  if (isUndefined(obj)) return

  let pointIndex = path.indexOf('.')
  let propName = path.substring(0, pointIndex === -1 ? path.length : pointIndex)
  if (pointIndex === -1 && obj.hasOwnProperty(propName)) return obj[propName]
  else {
    let newPath = path.substring(pointIndex + 1)
    return getProp(obj[propName], newPath)
  }
}

module.exports = {
  isBlank,
  isUndefined,
  isPropDefined,
  arePropsDefined,
  getProp
}
