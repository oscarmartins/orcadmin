
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

const SIGNUP = 1000
const SIGNIN = 2000
const ACCOUNT_VERIFY = 3000
const ACCOUNT_RECOVERY = 4000
const NEW_SIGNUP = 1010
const ON_SIGNIN = 2010
const ON_SIGNOUT = 2020

//Account STATES
const onAccountValidation = 10100
const onAccountValidationCode = 10200
const onPasswordRecovery = 20100
const onPasswordRecoveryCode = 20200

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
  console.log(main.REQ_CONTEX, main.REQ_ACTION, main.REQ_INPUTS)
  return {isok: true, error: msg}
}
function validateSignInAndUp () { return AccountPolicy.validateSignInAndUp(main.REQ_INPUTS) }
module.exports = {
  async execute (req, res) {
    console.log('Account Management execute')
    main.httpRequest = req
    main.httpResponse = res
    const paramValidator = preparams()
    let checkpoint = null
    if (paramValidator.isok) {
      if (main.REQ_CONTEX === SIGNUP) {
        if (main.REQ_ACTION === NEW_SIGNUP) {
          checkpoint = validateSignInAndUp()
          if (checkpoint.isok) {
            signup()
          } else {
            responseSender({status: 400, output: checkpoint})
          }
        }
      }
      if (main.REQ_CONTEX === SIGNIN) {
        if (main.REQ_ACTION === ON_SIGNIN) {
          checkpoint = validateSignInAndUp()
          if (checkpoint.isok) {
            signin()
          } else {
            responseSender({status: 400, output: checkpoint})
          }
        } else if (main.REQ_ACTION === ON_SIGNOUT) {
          signout()
        }
      }
    } else {
      responseSender({status: 500, output: paramValidator.error})
    }
  }
}

async function signup () {
  try {
    const result = await AuthenticationController.signup(main.REQ_INPUTS)
    responseSender(result)
  } catch (error) {
    console.log(error)
  }
}

async function signin () {
  try {
    const result = await AuthenticationController.signin(main.REQ_INPUTS)
    responseSender(result)
  } catch (error) {
    console.log(error)
  }
}

async function signout () {
  const result = await AuthenticationController.signout(main)
  responseSender(result)
}

function responseSender (result) {
  main.httpResponse.status(result.status).send(result.output)
}
