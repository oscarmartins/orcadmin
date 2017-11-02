const Account = require('../models/Accounts')
let accountStatus = false
module.exports = {
  accountValid: 101010,
  onAccountValidation: 10000,
  onAccountValidationCode: 11000,
  onPasswordRecovery: 20000,
  onPasswordRecoveryCode: 21000,
  onPasswordRecoveryChange: 22000,
  getAccountModel () {
    return new Account()
  },
  createNewAccount (user) {
    const account = this.getAccountModel()
    account.user_id = user.id
    account.code = null
    account.accountStatus = this.onAccountValidation
    account.nextStage = this.onAccountValidationCode
    account.dateCreated = new Date()
    account.dateUpdated = new Date()
  },
  checkAccountStatus () {
    return accountStatus
  }
}
