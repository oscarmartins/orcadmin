
/**
 * REQ_CONTEX
        1000 -> user_registration
        2000 -> login
        3000 -> account_verify
        4000 -> recovery_password

        REQ_ACTION
        1000:1010 -> createNewUser

        2000:2010 -> login
        2000:2020

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
  console.log(main.REQ_CONTEX, main.REQ_ACTION, main.REQ_INPUTS)
  return {isok: true, error: msg}
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

function sendError (status, msg) {
  main.httpResponse.status(403).send({error: msg})
}

module.exports = {
  async execute (req, res) {
    console.log('Account Management execute')
    main.httpRequest = req
    main.httpResponse = res
    const paramValidator = preparams()
    if (paramValidator.isok) {
      if (main.REQ_CONTEX === 1000) {
        if (main.REQ_ACTION === 1010) {
          if (AccountPolicy.validateSignInAndUp(main.httpResponse, main.REQ_INPUTS).isok) {
            signup()
          }
        }
      }
      if (main.REQ_CONTEX === 2000) {
        if (main.REQ_ACTION === 2010) {
          if (AccountPolicy.validateSignInAndUp(main.httpResponse, main.REQ_INPUTS).isok) {
            signin()
          }
        } else if (main.REQ_ACTION === 2020) {
          signout()
        }
      }
    } else {
      sendError(500, paramValidator.error)
    }
  }
}
