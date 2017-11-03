const Account = require('../models/Accounts')
const User = require('../models/User')
const EmailSender = require('../controllers/orcmailer')

EmailSender.accountProfile = 'accounts_notificator'

let accountStatus = false

function resultOutput (iook, success, error, data) {
  console.log('AccountManager DEBUG begin', '\niook = ' + iook, ', success = ' + success, ', error = ' + error, '\nAccountManager DEBUG end')
  return {
    iook: iook,
    success: success,
    error: error,
    data: data | null
  }
}

function resultOutputSuccess (success) { return resultOutput(true, success, null, null) }
function resultOutputError (error) { return resultOutput(false, null, error, null) }
function resultOutputData (data) { return resultOutput(true, null, null, data) }

module.exports = {
  accountValid: 101010,
  onAccountValidation: 10000,
  onAccountValidationCode: 11000,
  onPasswordRecovery: 20000,
  onPasswordRecoveryCode: 21000,
  onPasswordRecoveryChange: 22000,
  backoffice: {
    initAccounts: function () {
    },
    sendAccountsResume: async function (email) {
      // codigo testes
      const mailOptions = {
        to: email, // list of receivers
        subject: 'Hello ✔✔', // Subject line
        text: 'Hello world? ✔', // plain text body
        html: '<b>Hello world? oscar</b>' // html body
      }
      const emailSent = await EmailSender.sendMail(mailOptions)
      if (emailSent) {
        console.log('email enviado')
        return true
      }
      return false
    }
  },
  notificator: {
    emailMessageTransport: function (msgOpt, userEmail) {
      let subject = null
      let text = null
      let html = null
      switch (msgOpt) {
        case 100:
          subject = 'Welcome to ORC Admin'
          html = '<h3>Congratulations {{username}}, </h3><p>Your account was successfully created. See you soon.<p>'
          break
        default:
          break
      }
      const mailOptions = {
        to: userEmail, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html // html body
      }
      return mailOptions
    },
    sendEmailInfoNewUserCreated: async function (to) {
      const msg = this.emailMessageTransport(100, to)
      msg.html = msg.html.replace('{{username}}', to.split('@')[0])
      const emailSent = await EmailSender.sendMail(msg)
      return emailSent
    }
  },
  getAccountModel () {
    return new Account()
  },
  async querySelect (query, filter) {
    filter = filter | {}
    const result = await Account.find(query)
    return result
  },
  async createNewAccount (user) {
    const checkExist = await this.querySelect({user_id: user._id})
    if (checkExist && checkExist.length !== 0) {
      return resultOutputError('ERROR CODE 500 [ ** nao e possivel concluir criar uma conta para este utilizador **  ]')
    } else {
      const account = this.getAccountModel()
      account.user_id = user._id
      account.code = null
      account.accountStatus = this.onAccountValidation
      account.nextStage = this.onAccountValidationCode
      account.dateCreated = new Date()
      account.dateUpdated = new Date()
      const saveResult = await account.save()
      if (saveResult) {
        this.notificator.sendEmailInfoNewUserCreated(user.email)
        return resultOutput(true, 'A conta foi criada com sucesso.', null, saveResult)
      } else {
        return resultOutput(false, null, 'ERROR CODE 510 [ ** Nao foi possivel criar conta.. **  ]', saveResult)
      }
    }
  },
  checkAccountStatus () {
    return accountStatus
  }
}
