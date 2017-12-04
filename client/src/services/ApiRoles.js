const parameters = (rc, ra, ri) => { return {REQ_CONTEX: rc, REQ_ACTION: ra, REQ_INPUTS: ri} }
module.exports = {
  register (payload) { return parameters(1000, 1010, payload) },
  login (payload) { return parameters(2000, 2010, payload) },
  logout (payload) { return parameters(2000, 2020, payload) },
  passwordRecoveryEmail (payload) { return parameters(4000, 4010, payload) },
  passwordRecoveryCode (payload) { return parameters(4000, 4020, payload) },
  passwordRecoveryReset (payload) { return parameters(4000, 4030, payload) },
  checkAccountStatus (payload) { return parameters(5000, 5010, payload) },
  generateAccountCodeVerification (payload) { return parameters(5000, 5020, payload) },
  validateAccountCode (payload) { return parameters(5000, 5030, payload) }
}
