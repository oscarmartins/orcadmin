const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: 60
  })
}

module.exports = {
  async register (req, res) {
    try {
      const {email, password} = req.body
      await User.findOne({'email': email}, function (err, user) {
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
              }
              console.log('result', result)
            })
            const usrJson = newUser.toJSON()
            return res.send({
              user: usrJson,
              token: jwtSignUser(usrJson)
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
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'The login info was incorrect [findOne]'
        })
      }
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login info was incorrect [password]'
        })
      }
      const usrJson = user.toJSON()
      res.send({
        user: usrJson,
        token: jwtSignUser(usrJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to login'
      })
    }
  }
}
