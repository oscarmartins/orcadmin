const Joi = require('joi')
const schema = {
  email: Joi.string().email(),
  password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$')).required().options({
    language: {
      string: {
        regex: {
          base: 'with value ******* fails to match the required pattern: /^[a-zA-Z0-9]{8,32}$/ '
        }
      }
    }
  })
}
function schemaAccountRecovery (mode) {
  if (mode === 'email') {
    return {email: Joi.string().email()}
  }
  if (mode === 'reset') {
    return {password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$')).required().options({
      language: {
        string: {
          regex: {
            base: 'with value ******* fails to match the required pattern: /^[a-zA-Z0-9]{8,32}$/ '
          }
        }
      }
    }),
    confirmPassword: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$')).required().valid(Joi.ref('password')).options({
      language: {
        string: {
          regex: {
            base: 'with value ******* fails to match the required pattern: /^[a-zA-Z0-9]{8,32}$/ '
          }
        },
        any: {
          allowOnly: '!!Passwords do not match'
        }
      }
    })}
  }
}
module.exports = {
  accountRecovery (mode, inputs) {
    let output = {error: '', isok: true}
    const {error} = Joi.validate(inputs, schemaAccountRecovery(mode))
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          output.isok = false
          output.error = error.details[0].message
          break
        case 'password':
          output.isok = false
          output.error = error.details[0].message
          break
        case 'confirmPassword':
          output.isok = false
          output.error = error.details[0].message
          break
      }
    }
    return output
  },
  validateSignInAndUp (inputs) {
    let output = {error: '', isok: true}
    const {error} = Joi.validate(inputs, schema)
    if (error) {
      output.isok = false
      switch (error.details[0].context.key) {
        case 'email':
          output.error = error.details[0].message
          break
        case 'password':
          output.error = error.details[0].message
          break
        default:
          output.error = error.details[0].message
      }
    }
    return output
  }
}
