const User = require('../models/User')
const Accounts = require('../models/Accounts')
const EmailSender = require('../controllers/orcmailer')
const uuid = require('uuid')
const _session = {_userAdmin: null, _userSession: null}
EmailSender.accountProfile = 'accounts_notificator'

let loggerinsta = ''

function loggerDebugClear () {
  loggerinsta = null
}

function loggerDebug (buffer) {
  loggerinsta += ('\n[{{serial}}] {{buffer}} \n[{{serial}}]').replace(new RegExp('{{serial}}', 'g'), _session._userSession).replace('{{buffer}}', buffer)
}

function loggerResume () {
  console.log(loggerinsta)
  return loggerinsta
}

function resultOutput (iook, success, error, data) {
  var log = `UserAccountHelper DEBUG::begin iook = ${iook} success = ${success} error = ${error} data = ${data} DEBUG::end UserAccountHelper`
  loggerDebug(log)
  return {
    iook: iook,
    success: success,
    error: error,
    data: data || null
  }
}

async function removeUsersAll () {
  loggerDebug('removeUsersAll begin')
  let usersEraseAll = null
  const output = instance.resultOutputSuccess(null)
  try {
    usersEraseAll = await User.find().then(function (usr) {
      return usr
    }).catch(function (err) {
      return err
    })
    if (usersEraseAll instanceof Array) {
      for (let user of usersEraseAll) {
        await User.findByIdAndRemove(user._id, function (err, doc) {
          if (err) {
            loggerDebug(err)
          }
          return doc
        })
      }
    } else {
      loggerDebug('removeUsersAll error type')
    }
    loggerDebug('removeUsersAll end')
    output.success = `Foram removidos [${usersEraseAll.length}] registos.`
    output.data = {users: usersEraseAll, logger: loggerResume()}
    loggerDebug(output.success)
  } catch (error) {
    return instance.resultOutputError(error)
  }
  return output
}

async function removeAccountsAll () {
  loggerDebug('removeAccountsAll begin')
  let accountEraseAll = null
  const output = instance.resultOutputSuccess(null)
  try {
    accountEraseAll = await Accounts.find().then(function (act) {
      return act
    }).catch(function (err) {
      return err
    })
    if (accountEraseAll instanceof Array) {
      for (let account of accountEraseAll) {
        await Accounts.findByIdAndRemove(account._id, function (err, doc) {
          if (err) {
            loggerDebug(err)
          }
          return doc
        })
      }
    } else {
      loggerDebug('removeAccountsAll error type')
    }
    loggerDebug('removeAccountsAll end')
    output.success = `Foram removidos [${accountEraseAll.length}] registos.`
    output.data = {account: accountEraseAll, logger: loggerResume()}
    loggerDebug(output.success)
  } catch (error) {
    return instance.resultOutputError(error)
  }
  return output
}

const instance = {
  _userAdmin: null,
  _userSession: null,
  _onSession: () => {
    return (instance._userAdmin === _session._userAdmin && instance._userSession === _session._userSession)
  },
  clearSession: () => {
    instance._userAdmin = null
    instance._userAdmin = null
    _session._userAdmin = uuid()
    _session._userSession = uuid()
    loggerDebugClear()
  },
  resultOutputSuccess: (success) => { return resultOutput(true, success, null, null) },
  resultOutputError: (error) => { return resultOutput(false, null, error, null) },
  resultOutputDataOk: (data) => { return resultOutput(true, null, null, data) },
  resultOutputDataError: (data) => { return resultOutput(false, null, null, data) },
  fetchCredentials: function () {
    /** static mode */
    return {credential: '111110000000000', passport: 12345678}
  },
  authenticator: (useradmin) => {
    try {
      instance.clearSession()
      const {credential, passport} = useradmin
      if (!credential || !passport) {
        throw new Error('parametros de autenticacao invalidos!!!')
      }
      if (((instance.fetchCredentials().credential === credential && instance.fetchCredentials().passport === passport))) {
        instance._userAdmin = `${credential}`
        _session._userAdmin = instance._userAdmin
        _session._userSession = uuid()
        instance._userSession = _session._userSession
        return true
      }
    } catch (error) {
      loggerDebug(error)
    }
    return false
  },
  accountSecureReset: async function (data) {
    var validator = null
    try {
      if (instance.authenticator(data)) {
        if (instance._onSession()) {
          let validatorTmp = null
          validator = await removeUsersAll()
          if (validator.iook) {
            validatorTmp = validator
            loggerDebugClear()
            validator = await removeAccountsAll()
            if (validator.iook) {
              const outobj = instance.resultOutputSuccess('operacao concluidacom sucesso!.')
              outobj.data = {
                users: {
                  success: validatorTmp.success,
                  data: validatorTmp.data
                },
                accounts: {
                  success: validator.success,
                  data: validator.data
                }
              }
              return outobj
            } else {
              throw new Error(`accountSecureReset() => erro removeAccountsAll() ${validator.error}`)
            }
          } else {
            throw new Error(`accountSecureReset() => erro removeUsersAll() ${validator.error}`)
          }
        } else {
          throw new Error('accountSecureReset() => erro ao verificar sessao.')
        }
      } else {
        throw new Error('accountSecureReset() => erro ao autenticar utilizador.')
      }
    } catch (error) {
      loggerDebug(error)
      return instance.resultOutputError(loggerResume())
    }
  }
}

module.exports = instance
