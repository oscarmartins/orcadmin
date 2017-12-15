
/**
  REQ_CONTEX
        1000 -> signup
        2000 -> signin
        3000 -> account_verify
        4000 -> recovery_password

  REQ_ACTION
        1000:1010 -> createNewUser

        2000:2010 -> login
        2000:2020 -> logout

        3000:3010 -> checkAccount
        3000:3020 -> validateAccountEmail
        3000:3030 -> validateAccountCode

        4000:4010 -> recoveryPasswordEmail
        4000:4020 -> recoveryPasswordCode
        4000:4030 -> recoveryPasswordReset

 */

const AuthenticationController = require('./AuthenticationController')
const AccountPolicy = require('../policies/AccountPolicy')
const main = this
main['httpRequest'] = null
main['httpResponse'] = null
main['REQ_CONTEX'] = 0
main['REQ_ACTION'] = 0
main['REQ_INPUTS'] = {}

function preparams () {
  let msg = null
  if (!main.httpRequest) { msg = 'Error [Http] [missing httpRequest]' }
  if (!main.httpResponse) { msg = 'Error [Http] [missing httpResponse]' }
  const body = main.httpRequest.body
  const {REQ_CONTEX, REQ_ACTION, REQ_INPUTS} = body
  if (!REQ_CONTEX) { msg = 'Error [Parameter] [missing REQ_CONTEXT]' }
  if (!REQ_ACTION) { msg = 'Error [Parameter] [missing REQ_ACTION]' }
  if (!REQ_INPUTS) { msg = 'Error [Parameter] [missing REQ_INPUTS]' }
  if (msg) { return {isok: false, error: msg} }
  main.REQ_CONTEX = REQ_CONTEX
  main.REQ_ACTION = REQ_ACTION
  main.REQ_INPUTS = REQ_INPUTS
  /** use debug mode */
  console.log(main.REQ_CONTEX, main.REQ_ACTION, main.REQ_INPUTS)
  return {isok: true, error: msg}
}
function validateSignInAndUp () { return AccountPolicy.validateSignInAndUp(main.REQ_INPUTS) }
function accountRecovery (mode) { return AccountPolicy.accountRecovery(mode, main.REQ_INPUTS) }
module.exports = {
  async execute (req, res) {
    console.log('Account Management execute')
    main.httpRequest = req
    main.httpResponse = res
    const paramValidator = preparams()
    let checkpoint = null
    if (paramValidator.isok) {
      // checkAccountStatus API
      if (main.REQ_CONTEX === AuthenticationController.options.CHECKACCOUNTSTATUS) {
        if (main.REQ_ACTION === AuthenticationController.options.onCheckAccountStatus) {
          accountStatus()
        } else if (main.REQ_ACTION === AuthenticationController.options.onGenerateAccountCode) {
          generateAccountCode()
        } else if (main.REQ_ACTION === AuthenticationController.options.onGenerateAccountCode) {
          validateAccountCode()
        } else {
          responseSender({status: 400, output: {error: 'REQ_ACTION not found.', isok: false}})
        }
        return true
      }
      if (main.REQ_CONTEX === AuthenticationController.options.ACCOUNT_RECOVERY) {
        let mode = null
        if (main.REQ_ACTION === AuthenticationController.options.ACCOUNT_RECOVERY_EMAIL) {
          mode = 'email'
        }
        if (main.REQ_ACTION === AuthenticationController.options.ACCOUNT_RECOVERY_RESET) {
          mode = 'reset'
        }
        if (mode) {
          checkpoint = accountRecovery(mode)
        }
        if ((checkpoint && checkpoint.isok) || main.REQ_ACTION === AuthenticationController.options.ACCOUNT_RECOVERY_CODE) {
          passwordRecovery()
        } else {
          responseSender({status: 400, output: checkpoint})
        }
        return true
      }
      if (main.REQ_CONTEX === AuthenticationController.options.SIGNUP) {
        if (main.REQ_ACTION === AuthenticationController.options.NEW_SIGNUP) {
          checkpoint = validateSignInAndUp()
          if (checkpoint.isok) {
            signup()
          } else {
            responseSender({status: 400, output: checkpoint})
          }
          return true
        }
      }
      if (main.REQ_CONTEX === AuthenticationController.options.SIGNIN) {
        if (main.REQ_ACTION === AuthenticationController.options.ON_SIGNIN) {
          checkpoint = validateSignInAndUp()
          if (checkpoint.isok) {
            signin()
          } else {
            responseSender({status: 400, output: checkpoint})
          }
        } else if (main.REQ_ACTION === AuthenticationController.options.ON_SIGNOUT) {
          signout()
        }
        return true
      }
      if (main.REQ_CONTEX === AuthenticationController.options.backoffice) {
        if (main.REQ_ACTION === AuthenticationController.options.backoffice_hardReset) {
          const _res = await backOfficeHardReset(main.REQ_INPUTS)
          if (_res) {
            console.log(_res)
          }
        }
      }
      return true
    }
    const error = (paramValidator.error && paramValidator.error.length !== 0) ? paramValidator.error : 'Não foi possivel concluir o pedido requerido. Por favor tente mais tarde. Obrigado.'
    responseSender({status: 500, output: {error: error}})
  }
}

async function signup () {
  try {
    const result = await AuthenticationController.signup(main.REQ_INPUTS)
    return responseSender(result)
  } catch (error) {
    console.log(error)
  }
}

async function signin () {
  try {
    const result = await AuthenticationController.signin(main.REQ_INPUTS)
    return responseSender(result)
  } catch (error) {
    console.log(error)
  }
}

async function signout () {
  const result = await AuthenticationController.signout(main)
  return responseSender(result)
}

async function passwordRecovery () {
  const result = await AuthenticationController.passwordRecovery(main)
  return responseSender(result)
}

async function accountStatus () {
  const result = await AuthenticationController.accountStatus(main)
  return responseSender(result)
}

async function generateAccountCode () {
  const result = await AuthenticationController.generateAccountCode(main)
  return responseSender(result)
}

async function validateAccountCode () {
  const result = await AuthenticationController.validateAccountCode(main)
  return responseSender(result)
}

async function backOfficeHardReset (credentials) {
  const result = await AuthenticationController.backOfficeHardReset(credentials)
  return responseSender(result)
}

function responseSender (result) {
  main.httpResponse.status(result.status).send(result.output)
  return result
}

function sendSMS () {
  const BulkSMS = require('../utils/BulkSMS')
  const sms = new BulkSMS('', '')
  sms.send('+351913859014', 'teste', (err, result) => {
    if (err) {
      console.log(err)
      return false
    }
    console.log(result)
    return true
  })
}
