const User = require('../models/User')
const AccountManager = require('../utils/AccountManager')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

const options = {
  SIGNUP: 1000,
  SIGNIN: 2000,
  ACCOUNT_VERIFY: 3000,
  ACCOUNT_RECOVERY: 4000,
  ACCOUNT_RECOVERY_EMAIL: 4010,
  ACCOUNT_RECOVERY_CODE: 4020,
  ACCOUNT_RECOVERY_RESET: 4030,
  NEW_SIGNUP: 1010,
  ON_SIGNIN: 2010,
  ON_SIGNOUT: 2020,
  onAccountValidation: 10100,
  onAccountValidationCode: 10200,
  onPasswordRecovery: 20100,
  onPasswordRecoveryCode: 20200
}

function _resolveResponse (res, result) {
  if (result.status === 200) {
    res.send(result.output)
  } else {
    res.status(result.status).send(result.output)
  }
}

function jwtSignUser (user) {
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: '30m'
  })
}

async function _signup (payload) {
  try {
    const {email, password} = payload
    const user = await User.findOne({'email': email}, {'email': 1, password: 1})
    if (user) {
      return {
        status: 400,
        output: {error: 'This email account is already in use'}
      }
    } else {
      var newUser = new User()
      newUser.email = email
      newUser.password = newUser.encryptPassword(password)
      const result = await newUser.save()
      if (result) {
        const msg = 'Your registration has been successfully completed. Redirect to Sign In...'
        const result = await AccountManager.createNewAccount(newUser)
        if (result.iook) {
          return {
            status: 200,
            output: {message: msg, success: result.success}
          }
        } else {
          return {
            status: 400,
            output: {error: result.error}
          }
        }
      } else {
        console.log('register fail')
        return {
          status: 400,
          output: {error: 'error register fail.'}
        }
      }
    }
  } catch (err) {
    return {
      status: 400,
      output: {error: err}
    }
  }
}
/**
 * 
 * @param {*} payload 
 * 
 * return {
 *   status: number,
 *   output: {}
 * }
 */
async function _signin (payload) {
  try {
    const {email, password} = payload
    const filter = {'email': 1, password: 1}
    const result = await User.findOne({email: email}, filter)
    if (!result) {
      return {
        status: 403,
        output: {error: 'The login info was incorrect'}
      }
    } else {
      const isPasswordValid = await result.validPassword(password)
      if (!isPasswordValid) {
        return {
          status: 403,
          output: {
            error: 'The login info was incorrect [email or password]'
          }
        }
      } else {
        // check account status
        const checkAccountStatus = await AccountManager.checkAccountStatus(AccountManager.mode.Signin, result)
        if (checkAccountStatus) {
          console.log(12345)
          return checkAccountStatus
        } else {
          const usrJson = result.toJSON()
          const theToken = jwtSignUser(usrJson)
          return {
            status: 200,
            output: {
              profile: usrJson,
              access_token: theToken,
              message: 'signin ok'
            }
          }
        }
      }
    }
  } catch (err) {
    return {
      status: 500,
      output: {error: 'An error has occured trying to login'}
    }
  }
}

async function _signout (main) {
  try {
    const logout = await main.httpRequest.session.destroy()
    if (logout) {
      return {
        status: 200,
        output: {
          profile: null,
          access_token: null,
          message: 'signout yes'
        }
      }
    }
  } catch (err) {
    console.log(err)
    return {
      status: 500,
      output: {error: 'An error has occured trying to signout'}
    }
  }
}
/**
 * todo
 * primeiro post --> require email
 * segundo post --> require email & code
 * terceiro post --> require email & code & password & passwordConfirm
 * 
 * @param {*} payload 
 */
async function _passwordRecovery (payload) {
  if (payload.REQ_ACTION === options.ACCOUNT_RECOVERY_EMAIL) {
    console.log('email')
  }
  if (payload.REQ_ACTION === options.ACCOUNT_RECOVERY_CODE) {
    console.log('code')
  }
  if (payload.REQ_ACTION === options.ACCOUNT_RECOVERY_RESET) {
    console.log('reset')
  }
}

module.exports = {
  options: options,
  async signup (payload) {
    const result = await _signup(payload)
    return result
  },
  async signin (payload) {
    const result = await _signin(payload)
    return result
  },
  async signout (main) {
    const result = await _signout(main)
    return result
  },
  async passwordRecovery (main) {
    const result = await _passwordRecovery(main)
    return result
  },
  async logout (req, res) {
    try {
      req.session.destroy(function (err) {
        if (err) {
          console.log('### erro ao destruir sessão')
          return res.status(400).send({
            error: err
          })
        }
        return res.status(200).send({success: 1})
      })
    } catch (err) {
      return res.status(400).send({
        error: err
      })
    }
  },
  async login (req, res) {
    try {
      const result = await _signin(req.body)
      _resolveResponse(res, result)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to login'
      })
    }
  }
}
