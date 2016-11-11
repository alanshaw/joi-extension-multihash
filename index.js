var multihashes = require('multihashes')

function validateMultihash (value, state, options, encoding) {
  try {
    let multihash = value

    switch (encoding) {
      case 'b58':
        multihash = multihashes.fromB58String(value)
        break
      case 'hex':
        multihash = multihashes.fromHexString(value)
        break
    }

    multihashes.validate(multihash)
  } catch (err) {
    if (err.message.indexOf('too short') > -1) {
      return this.createError('multihash.short', { v: value }, state, options)
    } else if (err.message.indexOf('too long') > -1) {
      return this.createError('multihash.long', { v: value }, state, options)
    } else if (err.message.indexOf('unknown function code') > -1) {
      return this.createError('multihash.code', { v: value }, state, options)
    } else if (err.message.indexOf('length inconsistent') > -1) {
      return this.createError('multihash.length', { v: value }, state, options)
    } else if (err.message.indexOf('Non-base') > -1) {
      return this.createError('multihash.base', { v: value }, state, options)
    } else {
      return this.createError('multihash.error', { v: value, message: err.message }, state, options)
    }
  }

  return value
}

module.exports = {
  name: 'multihash',
  language: {
    short: 'too short. must be > 3 bytes.',
    long: 'too long. must be < 129 bytes.',
    code: 'unknown function code',
    length: 'length inconsistent',
    base: 'non-base58 character',
    error: '{{message}}'
  },
  rules: [{
    name: 'b58', // Validate a base 58 encoded string multihash
    validate: function (params, value, state, options) {
      return validateMultihash.bind(this)(value, state, options, 'b58')
    }
  }, {
    name: 'hex', // Validate a hex encoded string multihash
    validate: function (params, value, state, options) {
      return validateMultihash.bind(this)(value, state, options, 'hex')
    }
  }, {
    name: 'buffer', // Validate buffer multihash
    validate: function (params, value, state, options) {
      return validateMultihash.bind(this)(value, state, options, 'buffer')
    }
  }]
}
