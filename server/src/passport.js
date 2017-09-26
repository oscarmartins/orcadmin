
const passport = require('passport')
const User = require('./models/User')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('./config/config')

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
  }, async function (jwtPayload, done) {
    try {
      User.findOne({'id': jwtPayload.id}, (err, user) => {
        if (err) {
          done(new Error(), false)
        }
        if (!user) {
          done(new Error(), false)
        }
        done(null, user)
      })
    } catch (error) {
      return done(new Error(), false)
    }
  })
)
module.exports = null
