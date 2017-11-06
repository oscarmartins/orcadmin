const User = require('../models/User')
const AccountManager = require('../utils/AccountManager')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

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
        const checkAccountStatus = await AccountManager.checkAccountStatus(result)
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

module.exports = {
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
