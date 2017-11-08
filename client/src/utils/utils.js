const methods = {
  camelCase: function camelCase (name) {
    return name.replace(/([:-_]+(.))/g, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter
    })
  },
  isObject: function isObject (value) {
    return value !== null && typeof value === 'object'
  },
  isString: function isString (value) {
    return typeof value === 'string'
  },
  isFunction: function isFunction (value) {
    return typeof value === 'function'
  },
  objectExtend: function objectExtend (a, b) {
  // Don't touch 'null' or 'undefined' objects.
    if (a == null || b == null) {
      return a
    }
    Object.keys(b).forEach(function (key) {
      if (Object.prototype.toString.call(b[key]) === '[object Object]') {
        if (Object.prototype.toString.call(a[key]) !== '[object Object]') {
          a[key] = b[key]
        } else {
          a[key] = objectExtend(a[key], b[key])
        }
      } else {
        a[key] = b[key]
      }
    })
    return a
  },
/**
 * Assemble url from two segments
 * @author Sahat Yalkabov <https://github.com/sahat>
 * @copyright Method taken from https://github.com/sahat/satellizer
 * @param  {String} baseUrl Base url
 * @param  {String} url     URI
 * @return {String}
 */
  joinUrl: function joinUrl (baseUrl, url) {
    if (/^(?:[a-z]+:)?\/\//i.test(url)) {
      return url
    }
    var joined = [baseUrl, url].join('/')
    var normalize = function (str) {
      return str
        .replace(/[/]+/g, '/')
        .replace(/\/\?/g, '?')
        .replace(/\/#/g, '#')
        .replace(/:\//g, '://')
    }
    return normalize(joined)
  },
/**
 * Get full path based on current location
 * @author Sahat Yalkabov <https://github.com/sahat>
 * @copyright Method taken from https://github.com/sahat/satellizer
 * @param  {Location} location
 * @return {String}
 */
  getFullUrlPath: function getFullUrlPath (location) {
    var isHttps = location.protocol === 'https:'
    return location.protocol + '//' + location.hostname + ':' + (location.port || (isHttps ? '443' : '80')) + (/^\//.test(location.pathname) ? location.pathname : '/' + location.pathname)
  },
/**
 * Parse query string variables
 * @author Sahat Yalkabov <https://github.com/sahat>
 * @copyright Method taken from https://github.com/sahat/satellizer
 * @param  {String} Query string
 * @return {String}
 */
  parseQueryString: function parseQueryString (str) {
    var obj = {}
    var key
    var value
    (str || '').split('&').forEach(function (keyValue) {
      if (keyValue) {
        value = keyValue.split('=')
        key = decodeURIComponent(value[0])
        obj[key] = (!value[1]) ? decodeURIComponent(value[1]) : true
      }
    })
    return obj
  },
/**
 * Decode base64 string
 * @author Sahat Yalkabov <https://github.com/sahat>
 * @copyright Method taken from https://github.com/sahat/satellizer
 * @param  {String} str base64 encoded string
 * @return {Object}
 */
  decodeBase64: function decodeBase64 (str) {
    var Buffer
    if (typeof module !== 'undefined' && module.exports) {
      try {
        Buffer = require('buffer').Buffer
      } catch (err) {
        // noop
      }
    }
    var fromCharCode = String.fromCharCode
    var reBtou = new RegExp(['[\xC0-\xDF][\x80-\xBF]', '[\xE0-\xEF][\x80-\xBF]{2}', '[\xF0-\xF7][\x80-\xBF]{3}'].join('|'), 'g')
    var cbBtou = function (cccc) {
      switch (cccc.length) {
        case 4:
          var cp = ((0x07 & cccc.charCodeAt(0)) << 18) | ((0x3f & cccc.charCodeAt(1)) << 12) | ((0x3f & cccc.charCodeAt(2)) << 6) | (0x3f & cccc.charCodeAt(3))
          var offset = cp - 0x10000
          return (fromCharCode((offset >>> 10) + 0xD800) + fromCharCode((offset & 0x3FF) + 0xDC00))
        case 3:
          return fromCharCode(((0x0f & cccc.charCodeAt(0)) << 12) | ((0x3f & cccc.charCodeAt(1)) << 6) | (0x3f & cccc.charCodeAt(2)))
        default:
          return fromCharCode(((0x1f & cccc.charCodeAt(0)) << 6) | (0x3f & cccc.charCodeAt(1)))
      }
    }
    var btou = function (b) {
      return b.replace(reBtou, cbBtou)
    }
    var _decode = Buffer ? function (a) {
      return (a.constructor === Buffer.constructor ? a : new Buffer(a, 'base64')).toString()
    }
: function (a) {
  return btou(atob(a))
}
    return _decode(String(str).replace(/[-_]/g, function (m0) { return m0 === '-' ? '+' : '/' }).replace(/[^A-Za-z0-9/]/g, ''))
  }
}
export default methods
