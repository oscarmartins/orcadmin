const Account = require('../models/Accounts')
const User = require('../models/User')
const EmailSender = require('../controllers/orcmailer')
const uuid = require('uuid')

EmailSender.accountProfile = 'accounts_notificator'

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

const Modes = {
  Signin: 'Signin',
  Signup: 'Signup',
  PasswordRecovery: 'PasswordRecovery'
}

module.exports = {
  accountValid: 101010,
  onAccountValidation: 10000,
  onAccountValidationCode: 11000,
  onPasswordRecovery: 20000,
  onPasswordRecoveryCode: 21000,
  onPasswordRecoveryChange: 22000,
  mode: Modes,
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
  async checkAccountEmail (email) {
    let user = null
    try {
      user = await User.findOne({'email': email})
    } catch (error) {
      user = null
      console.log(error)
    }
    return user
  },
  async getAccountModel () {
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
      const account = await this.getAccountModel()
      account.user_id = user._id
      account.code = null
      account.accountStatus = this.onAccountValidation
      account.nextStage = this.onAccountValidationCode
      account.dateCreated = new Date()
      account.dateUpdated = new Date()
      /** */
      const saveResult = await account.save()
      /** */
      if (saveResult) {
        this.notificator.sendEmailInfoNewUserCreated(user.email)
        return resultOutput(true, 'A conta foi criada com sucesso.', null, saveResult)
      } else {
        return resultOutput(false, null, 'ERROR CODE 510 [ ** Nao foi possivel criar conta.. **  ]', saveResult)
      }
    }
  },
  /**
   * 
   * @param {*} user 
   * return Object
   * status number http status code
   */
  async checkAccountStatus (mode, user) {
    const account = await this.querySelect({user_id: user._id})
    const result = {
      status: 200,
      accountStatus: {
        as: 0,
        ns: 0,
        redirect: ''
      },
      output: {}
    }
    if (account && account.length !== 0) {
      const accountStatus = account[0].accountStatus
      const nextStage = account[0].nextStage

      result.accountStatus.as = accountStatus
      result.accountStatus.ns = nextStage

      if (accountStatus === this.accountValid && nextStage === this.accountValid) {
        result.status = 200
      }

      if (accountStatus === this.onAccountValidationCode && nextStage === this.onAccountValidationCode) {
        result.status = 400
      }

      if (accountStatus === this.onAccountValidation && nextStage === this.onAccountValidationCode) {
        result.status = 400
      }

      /** ======= isPasswordRecovery */
      if (accountStatus === this.onPasswordRecovery) {
        if (mode !== Modes.PasswordRecovery) {
          // 307 Temporary Redirect (since HTTP/1.1)
          /** unit test init */
          result.status = 307
          result.accountStatus.redirect = {
            name: 'passwordRecovery',
            params: {
              selectionMode: '',
              email: user.email
            }
          }
          /** unit test exit */
          // TODO depende do path actual - nao tem sentido fazer o redirect se o path estiver com o mesmo contexto
        } else {
          result.status = 200
        }
        if (nextStage === this.onPasswordRecovery) {
          result.accountStatus.redirect.params.selectionMode = 'email'
        }
        if (nextStage === this.onPasswordRecoveryCode) {
          result.accountStatus.redirect.params.selectionMode = 'code'
        }
        if (nextStage === this.onPasswordRecoveryChange) {
          result.accountStatus.redirect.params.selectionMode = 'passwords'
        }

        result.output = result.accountStatus
      }
      /** ======= isPasswordRecovery */
    }
    return result
  },
  async _changeAccountNextStage (id, email, ns) {
    if (ns === this.onPasswordRecoveryCode) {
      // 1 - check : accountStatus equals onPasswordRecovery
      // 2 - generate : code
      // 3 - update - account update [code and nextStage]
      const accounts = await this.querySelect({user_id: id})
      if (accounts && accounts.length === 1) {
        const account = accounts[0]
        console.log('debug nextStage=' + account.nextStage)
        const code = uuid()
        const dateUpdated = new Date()
        // TODO multi: true revision
        const resultUPD = await Account.update({user_id: id}, {accountStatus: this.onPasswordRecovery, nextStage: this.onPasswordRecoveryCode, code: code, dateUpdated: dateUpdated}, {multi: true})
        if (resultUPD) {
          console.log(123)
        } else {
          console.log(123)
        }
      } else {
        // errors
      }
    }
  },
  async changeAccountNextStageByUser (user, nextStage) {
    if (user) {
      const {_id, email} = user
      const result = await this._changeAccountNextStage(_id, email, nextStage)
      return result
    }
    return null
  },
  async changeAccountNextStageByEmail (email, nextStage) {
    const user = await this.checkAccountEmail(email)
    if (user) {
      const {_id, email} = user
      const result = await this._changeAccountNextStage(_id, email, nextStage)
      return result
    }
    return null
  }
}
