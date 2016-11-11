# joi-extension-multihash [![Build Status](https://travis-ci.org/alanshaw/joi-extension-multihash.svg?branch=master)](https://travis-ci.org/alanshaw/joi-extension-multihash) [![dependencies Status](https://david-dm.org/alanshaw/joi-extension-multihash/status.svg)](https://david-dm.org/alanshaw/joi-extension-multihash)

Validate a multihash. This is simply a wrapper around the `validate` method from the [multihashes](https://www.npmjs.com/package/multihashes) module.

## Example

```js
const Joi = require('joi').extend(require('joi-extension-multihash'))
const Assert = require('assert')
let schema, result

// Validate a base 58 encoded multihash string

schema = Joi.multihash().b58()
result = schema.validate('QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9')
Assert.ifError(result.error)

// Validate a hex encoded multihash string

schema = Joi.multihash().hex()
schema.validate('122077a4018fbde7f967064cd434f6749e80bd37ad3a359c00ab6b94ad98c366da9a')
Assert.ifError(result.error)

// Validate a multihash buffer

schema = Joi.multihash().buffer()
schema.validate(new Buffer())
Assert.ifError(result.error)
```

---

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
