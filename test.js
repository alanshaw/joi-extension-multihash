const test = require('tape')
const Joi = require('joi').extend(require('./'))
const multihashes = require('multihashes')

test('should validate a base 58 multihash correctly', (t) => {
  t.plan(2)

  const input = 'QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9'
  const schema = Joi.multihash().b58()
  const result = schema.validate(input)

  t.ifError(result.error, 'no error validating a valid multihash')
  t.equal(result.value, input, 'value was correct')

  t.end()
})

test('should validate an invalid base 58 multihash correctly', (t) => {
  t.plan(1)

  const input = 'NOT A MULTIHASH'
  const schema = Joi.multihash().b58()
  const result = schema.validate(input)

  t.ok(result.error, 'expected error validating multihash')

  t.end()
})

test('should validate a hex multihash correctly', (t) => {
  t.plan(2)

  const input = '122077a4018fbde7f967064cd434f6749e80bd37ad3a359c00ab6b94ad98c366da9a'
  const schema = Joi.multihash().hex()
  const result = schema.validate(input)

  t.ifError(result.error, 'no error validating a valid multihash')
  t.equal(result.value, input, 'value was correct')

  t.end()
})

test('should validate an invalid hex multihash correctly', (t) => {
  t.plan(1)

  const input = 'NOT A MULTIHASH'
  const schema = Joi.multihash().hex()
  const result = schema.validate(input)

  t.ok(result.error, 'expected error validating multihash')

  t.end()
})

test('should validate a buffer multihash correctly', (t) => {
  t.plan(2)

  const input = multihashes.fromB58String('QmWPgGoxjsSazq94f3dvysj17d4pbebqamfMmVXn2DqkG9')
  const schema = Joi.multihash().buffer()
  const result = schema.validate(input)

  t.ifError(result.error, 'no error validating a valid multihash')
  t.equal(result.value, input, 'value was correct')

  t.end()
})

test('should validate an invalid buffer multihash correctly', (t) => {
  t.plan(1)

  const input = 'NOT A MULTIHASH'
  const schema = Joi.multihash().buffer()
  const result = schema.validate(input)

  t.ok(result.error, 'expected error validating multihash')

  t.end()
})

test('should validate a too short multihash correctly', (t) => {
  t.plan(1)

  const input = Buffer.from([])
  const schema = Joi.multihash().buffer()
  const result = schema.validate(input)

  t.ok(result.error, 'expected error validating multihash')

  t.end()
})

test('should validate a too long multihash correctly', (t) => {
  t.plan(1)

  const input = Buffer.from('122077a4018fbde7f967064cd434f6749e80bd37ad3a359c00ab6b94ad98c366da9a122077a4018fbde7f967064cd434f6749e80bd37ad3a359c00ab6b94ad98c366da9a')
  const schema = Joi.multihash().buffer()
  const result = schema.validate(input)

  t.ok(result.error, 'expected error validating multihash')

  t.end()
})
