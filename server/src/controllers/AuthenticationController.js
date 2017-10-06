const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: '30m'
  })
}

module.exports = {
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
  async register (req, res) {
    try {
      const {email, password} = req.body
      await User.findOne({'email': email}, {'email': 1, password: 1}, function (err, user) {
        if (err) {
          return res.status(400).send({
            error: err
          })
        } else {
          if (user) {
            return res.status(400).send({
              error: 'This email account is already in use'
            })
          } else {
            var newUser = new User()
            newUser.email = email
            newUser.password = newUser.encryptPassword(password)
            newUser.save(function (err, result) {
              if (err) {
                return res.status(400).send({
                  error: err
                })
              } else {
                const msg = 'Your registration has been successfully completed. Redirect to Sign In...'
                console.log(msg, result)
                return res.status(200).send({
                  message: msg
                })
              }
            })
          }
        }
      })
    } catch (err) {
      console.log('Erroror', err)
      return res.status(400).send({
        error: err
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const filter = {'email': 1, password: 1}
      await User.findOne({email: email}, filter, function (err, result) {
        if (err) {
          console.log('ERROR', err)
          return res.status(403).send({
            error: 'The login info was incorrect'
          })
        }
        if (!result) {
          return res.status(403).send({
            error: 'The login info was incorrect'
          })
        } else {
          const isPasswordValid = result.validPassword(password)
          if (!isPasswordValid) {
            return res.status(403).send({
              error: 'The login info was incorrect [password]'
            })
          }
          const usrJson = result.toJSON()
          const theToken = jwtSignUser(usrJson)
          res.send({
            profile: usrJson,
            access_token: theToken,
            message: 'signin ok'
          })
        }
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to login'
      })
    }
  }
}
