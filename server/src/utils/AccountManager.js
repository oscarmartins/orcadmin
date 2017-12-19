const Account = require('../models/Accounts')
const User = require('../models/User')
const EmailSender = require('../controllers/orcmailer')
const uuid = require('uuid')

EmailSender.accountProfile = 'accounts_notificator'

function resultOutput (iook, success, error, data) {
  console.log('AccountManager DEBUG begin', '\niook = ' + iook, ', success = ' + success, ', error = ' + error, ', data = ' + data, '\nAccountManager DEBUG end')
  return {
    iook: iook,
    success: success,
    error: error,
    data: data || null
  }
}

function resultOutputSuccess (success) { return resultOutput(true, success, null, null) }
function resultOutputError (error) { return resultOutput(false, null, error, null) }
function resultOutputDataOk (data) { return resultOutput(true, null, null, data) }
function resultOutputDataError (data) { return resultOutput(false, null, null, data) }

const Modes = {
  Signin: 'Signin',
  Signup: 'Signup',
  PasswordRecovery: 'PasswordRecovery'
}
const OPTIONS = {
  NEW_CODE_VALIDATION: 100,
  INVALIDATE_CODE_VALIDATION: -100,
  KEEP_CODE_VALIDATION: 200,
  SIGNUP: 1000,
  SIGNIN: 2000,
  ACCOUNT_VERIFY: 3000,
  ACCOUNT_RECOVERY: 4000,
  ACCOUNT_RECOVERY_EMAIL: 4010,
  ACCOUNT_RECOVERY_CODE: 4020,
  ACCOUNT_RECOVERY_RESET: 4030,
  ACCOUNT_RECOVERY_RESUME: 40102030,
  NEW_SIGNUP: 1010,
  ON_SIGNIN: 2010,
  ON_SIGNOUT: 2020,
  accountValid: 101010,
  onAccountValidation: 10000,
  onAccountValidationCode: 11000,
  onPasswordRecovery: 20000,
  onPasswordRecoveryCode: 21000,
  onPasswordRecoveryChange: 22000,
  CHECKACCOUNTSTATUS: 5000,
  onCheckAccountStatus: 5010,
  onGenerateAccountCode: 5020,
  onValidateAccountCode: 5030,
  backoffice: 123321,
  backoffice_hardReset: 66666666
}

module.exports = {
  options: OPTIONS,
  mode: Modes,
  backoffice: {
    fetchCredentials: function () {
      /** static mode */
      return {credential: '111110000000000', passport: 12345678}
    },
    /**
     * credentials: {
     * credential: 'AAAAAAAAAAAAAA',
     * passport: 00000000
     * }
     */
    hardReset: async function (credentials) {
      try {
        if (credentials && credentials.credential === this.fetchCredentials().credential && credentials.passport === this.fetchCredentials().passport) {
          const allAccounts = await Account.find().then(function (a) {
            return a
          }).catch(function (err) {
            return resultOutputError(err)
          })

          if (allAccounts instanceof Array) {
            const idsusr = []
            const usersSuccess = []
            const usersFails = []
            const accountsSuccess = []
            const accountsFails = []
            for (var p = 0; p < allAccounts.length; p++) {
              const tmpusrid = allAccounts[p].user_id
              idsusr.push(tmpusrid)
            }
            await allAccounts.forEach(async function (account, p1, A1) {
              const tmpusrid = account.user_id
              idsusr.push(tmpusrid)
            })
            await idsusr.forEach(async function (theid, p, allids) {
              const deleteUsr = await User.remove({_id: theid}, function (err, resultoper) {
                if (err) {
                  usersFails.push(`'ERRO: NAO FOI POSSIVEL REMOVER ESTE UTILIZADOR ID[${theid}]'`)
                }
                return resultoper
              })
              if (deleteUsr) {
                if (deleteUsr.result.n === 1 && deleteUsr.result.ok === 1) {
                  usersSuccess.push(`'UTILIZADOR REMOVIDO ID[${theid}]'`)
                } else {
                  usersFails.push(`'NAO FOI POSSIVEL REMOVER ESTE UTILIZADOR ID[${theid}]'`)
                }
              } else {
                usersFails.push(`'NAO FOI POSSIVEL REMOVER ESTE UTILIZADOR ID[${theid}]'`)
                throw new Error(`'NAO FOI POSSIVEL REMOVER ESTE UTILIZADOR ID[${theid}]'`)
              }

              const deleteAccount = await Account.remove({user_id: theid}, function (err, resultoper) {
                if (err) {
                  accountsFails.push(`'NAO FOI POSSIVEL REMOVER A CONTA COM ESTE UTILIZADOR ID[${theid}]'`)
                }
                return resultoper
              })
              if (deleteAccount) {
                if (deleteAccount.result.ns === 1 && deleteAccount.result.ok === 1) {
                  accountsSuccess.push`'CONTA REMOVIDA ID[${theid}]'`
                } else {
                  accountsFails.push(`'NAO FOI POSSIVEL REMOVER A CONTA COM ESTE UTILIZADOR ID[${theid}]'`)
                }
              } else {
                accountsFails.push(`'NAO FOI POSSIVEL REMOVER A CONTA COM ESTE UTILIZADOR ID[${theid}]'`)
                throw new Error(`'NAO FOI POSSIVEL REMOVER A CONTA COM ESTE UTILIZADOR ID[${theid}]'`)
              }
            })
            var resume = 'Resumo: \n'

            await usersSuccess.forEach(function (usrnow, p, all) {
              if (p === 0) {
                resume += 'Removidos com sucesso: \n'
              }
              resume += usrnow
              resume += '\n'
            })
            await usersFails.forEach(function (usrnow, p, all) {
              if (p === 0) {
                resume += 'Removidos sem sucesso: \n'
              }
              resume += usrnow
              resume += '\n'
            })
            await accountsSuccess.forEach(function (usrnow, p, all) {
              if (p === 0) {
                resume += 'Contas removidas com sucesso: \n'
              }
              resume += usrnow
              resume += '\n'
            })
            await accountsFails.forEach(function (usrnow, p, all) {
              if (p === 0) {
                resume += 'Contas removidas sem sucesso: \n'
              }
              resume += usrnow
              resume += '\n'
            })

            const qres = resultOutputSuccess(resume)
            qres.data = allAccounts
            return qres
          } else {
            throw new Error(allAccounts.error)
          }
        } else {
          throw new Error(' a sua credencial não é válida.  ')
        }
      } catch (error) {
        return resultOutputError(error)
      }
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
        case 200:
          subject = 'ORC Admin - Password Account Recovery'
          html = '<h3>Código de segurança</h3><p>Utilize o seguinte código de segurança para recuperar a sua conta {{email}} .<p> <p>Código de segurança: {{code}} <p><p>Obrigado, A equipa de Orc Admin</p>'
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
    },
    sendSecurityCodeByEmail: async function (to, opt, code) {
      const msg = this.emailMessageTransport(opt, to)
      msg.html = msg.html.replace('{{email}}', to).replace('{{code}}', code)
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
    filter = filter || {}
    const result = await Account.find(query)
    return result
  },
  async changeAccountStatus (id, _as, _ns, codeAction) {
    try {
      if (id) {
        const accounts = await this.querySelect({user_id: id})
        if (accounts && accounts.length === 1) {
          const account = accounts[0]
          const criteria = {user_id: account.user_id}
          var code = null
          if (codeAction === OPTIONS.NEW_CODE_VALIDATION) {
            code = uuid()
          } else if (codeAction === OPTIONS.KEEP_CODE_VALIDATION) {
            code = account.code
          }
          const query = {
            accountStatus: _as || account.accountStatus,
            nextStage: _ns || account.nextStage,
            code: code,
            dateUpdated: new Date()
          }
          const resultUPD = await Account.update(criteria, query)
          if (resultUPD && resultUPD.ok === 1) {
            console.log('**DEBUG Account.update: ', resultUPD)
            return resultOutput(true, 'alteração de estagio conluida com sucesso.', null, query)
          } else {
            throw new Error(' ** ocorreu um erro ao actualizar a conta **  ]')
          }
        } else {
          throw new Error(' ** não foi encontrada nenhuma conta com o user_id **  ]')
        }
      } else {
        throw new Error('[user id] format not valid ')
      }
    } catch (error) {
      return resultOutputError('ERROR ACCOUNT [ ' + error + ' ]')
    }
  },
  async fetchAccountStatus (userEmail) {
    const result = {
      status: 200,
      output: {
        accountStatus: {
          as: 0,
          ns: 0,
          mode: 'fetchAccountStatus',
          message: 'fetchAccountStatus',
          params: {
            selectionMode: 'fetchAccountStatus',
            email: userEmail
          }
        }
      }
    }
    try {
      const user = await this.checkAccountEmail(userEmail)
      if (user) {
        const account = await this.querySelect({user_id: user._id})
        if (account && account.length === 1) {
          const accTmp = account[0]
          result.output.accountStatus.as = accTmp.accountStatus
          result.output.accountStatus.ns = accTmp.nextStage
        } else {
          throw new Error('Nao foi possivel verificar estado da conta.')
        }
      } else {
        throw new Error('O email que indicou não está registado.')
      }
    } catch (error) {
      console.error(error)
      result.status = 400
      result.output.accountStatus.message = error
    }
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
      account.accountStatus = this.options.onAccountValidation
      account.nextStage = this.options.onAccountValidationCode
      account.dateCreated = new Date()
      account.dateUpdated = new Date()
      /** */
      const saveResult = await account.save()
      /** */
      if (saveResult) {
        await this.notificator.sendEmailInfoNewUserCreated(user.email)
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
        mode: mode,
        message: '',
        params: {
          selectionMode: '',
          email: user.email
        }
      },
      output: {}
    }
    if (account && account.length === 1) {
      const accountStatus = account[0].accountStatus
      const nextStage = account[0].nextStage

      result.accountStatus.as = accountStatus
      result.accountStatus.ns = nextStage

      if (accountStatus === this.options.accountValid && nextStage === this.options.accountValid) {
        result.status = 200
        if (mode === Modes.PasswordRecovery) {
          result.accountStatus.message = 'A sua password foi recupera com sucesso. '
          result.accountStatus.params.selectionMode = 'resume'
        }
      } else if (accountStatus === this.options.onAccountValidationCode && nextStage === this.options.onAccountValidationCode) {
        result.status = 400
      } else if (accountStatus === this.options.onAccountValidation && nextStage === this.options.onAccountValidationCode) {
        result.status = 400
        result.accountStatus.message = 'Validar Código de Segurança'
        result.accountStatus.params.selectionMode = 'codevalidation'
      } else if (accountStatus === this.options.onPasswordRecovery && mode === Modes.PasswordRecovery) {
        result.status = 200
        if (nextStage === this.options.onPasswordRecovery) {
          result.accountStatus.params.selectionMode = 'email'
        }
        if (nextStage === this.options.onPasswordRecoveryCode) {
          result.accountStatus.message = 'Enviamos um email com o código de segurança. Obrigado.'
          result.accountStatus.params.selectionMode = 'code'
        }
        if (nextStage === this.options.onPasswordRecoveryChange) {
          result.accountStatus.message = 'Código de segurança foi aceite.'
          result.accountStatus.params.selectionMode = 'passwords'
        }
      } else {
        if (accountStatus === this.options.onPasswordRecovery && mode === Modes.Signin) {
          const {code} = account[0]
          const forceUPD = await this.activateAccountAction(user, code)
          if (forceUPD.iook) {
            return this.checkAccountStatus(mode, user)
          } else {
            result.status = 400
            result.accountStatus.message = 'activateAccountAction failed'
            result.accountStatus.error = 'activateAccountAction failed'
          }
        } else {
          result.status = ((mode === Modes.Signin || mode === Modes.Signup) ? 200 : 400)
          const msg = ((mode === Modes.Signin || mode === Modes.Signup) ? 'DEBUG [ estado da conta errado. forçar nova validação ]' : 'Erro [o estado da conta nao tem conrrespondencia com o modo indicado. ]')
          result.accountStatus.error = msg
          result.accountStatus.message = msg
        }
      }
    } else {
      result.status = 400
      result.accountStatus.message = 'Erro [não foi possivel encontrar a conta.]'
      result.accountStatus.error = 'Erro [não foi possivel encontrar a conta.]'
    }
    result.output = result.accountStatus
    return result
  },
  async _sendPredefinedMail (opt) {
    const {email, accountStatus, nextStage} = opt
    if (email && accountStatus && nextStage) {
      const user = await this.checkAccountEmail(email)
      if (user) {
        const res = await this.querySelect({user_id: user._id, accountStatus: accountStatus, nextStage: nextStage})
        if (res && res.length === 1) {
          const account = res[0]
          if (accountStatus === this.options.onPasswordRecovery && nextStage === this.options.onPasswordRecoveryCode) {
            if (account.code !== null) {
              await this.notificator.sendSecurityCodeByEmail(user.email, 200, account.code)
              return resultOutputSuccess('email enviado com sucesso!! ')
            } else {
              return resultOutputError('ERROR _sendPredefinedMail.querySelect account.code [ ** ocorreu um erro, o codigo nao foi gerado.  **  ]')
            }
          }
        } else {
          return resultOutputError('ERROR _sendPredefinedMail.querySelect [ ** ocorreu um erro, ' + (res && res.length > 1 ? ' problema inconsistencia de dados. ' : ' nao foi possivel localizar a sua conta. ') + '  **  ]')
        }
      } else {
        return resultOutputError('ERROR _sendPredefinedMail.checkAccountEmail [ ** ocorreu um erro, o email nao pertence a um utilizador registado. **  ]')
      }
    } else {
      return resultOutputError('ERROR _sendPredefinedMail [ ** ocorreu um erro, o campo ' + (email ? (accountStatus ? (nextStage ? ' _###_ ' : 'nextStage') : 'accountStatus') : 'email') + ' é requerido!!! **  ]')
    }
  },
  async _changeAccountNextStage (id, nextState) {
    let _result = null
    const ns = nextState
    if (ns === OPTIONS.onGenerateAccountCode) {
    /**
     * @param {*} id 
     * @param {*} ns 
     * @param {*} inst 
     * - o status da conta tem de ser atualizado para confirmacao / validacao de registo de conta (5000/5020)
     * - - gerar novo codigo de validacao de conta e finalizar update da conta
     * - - - enviar email para o user com o codigo de validacao 
     */
      _result = await this.changeAccountStatus(id, OPTIONS.onCheckAccountStatus, ns, OPTIONS.NEW_CODE_VALIDATION)
      return _result
    } else if (ns === OPTIONS.onPasswordRecoveryCode) {
    /** 
     * @param {*} id 
     * @param {*} ns 
     * @param {*} inst 
     * 1 - check : accountStatus equals onPasswordRecovery
     * 2 - generate : code
     * 3 - update - account update [code and nextStage]
     */
      _result = await this.changeAccountStatus(id, OPTIONS.onPasswordRecovery, ns, OPTIONS.NEW_CODE_VALIDATION)
      return _result
    } else if (ns === OPTIONS.onPasswordRecoveryChange) {
    /** 
     * 
     * @param {*} id 
     * @param {*} ns 
     * @param {*} inst 
     * 1 - check : accountStatus equals onPasswordRecovery
     * 2 - generate : code
     * 3 - update - account update [code and nextStage]
    **/
      _result = await this.changeAccountStatus(id, OPTIONS.onPasswordRecovery, ns, OPTIONS.KEEP_CODE_VALIDATION)
      return _result
    }
    return resultOutputError('ERROR VALIDATION [ ** o NextStage que pretende mudar não é reconhecido **  ]')
  },
  async activateAccountAction (user, code) {
    if (user) {
      const {_id} = user
      const criteria = {
        user_id: _id,
        code: code
      }
      const query = {
        code: null,
        accountStatus: this.options.accountValid,
        nextStage: this.options.accountValid,
        dateUpdated: new Date()
      }
      const _accountCode = await this.querySelect(criteria)
      if (_accountCode && _accountCode.length === 1) {
        const accountUpd = await Account.update(criteria, query)
        if (accountUpd && accountUpd.ok === 1) {
          return resultOutputSuccess('a conta foi ativada com sucesso.')
        } else {
          return resultOutputError('ERROR ACTIVATE ACCOUNT [ ** ocorreu um erro interno. não foi possivel activar a conta **  ]')
        }
      } else {
        return resultOutputError('ERROR ACCOUNT [ ** não foi encontrada nenhuma conta com o user_id **  ]')
      }
    }
    return resultOutputError('ERROR ACCOUNT [ ** utilizador inválido **  ]')
  },
  async resetPassword (user, code, password) {
    if (user) {
      const {_id, email} = user
      const _accountCode = await this.querySelect({user_id: _id, code: code})
      if (_accountCode && _accountCode.length === 1) {
        const tmpusr = new User()
        const pwdencript = tmpusr.encryptPassword(password)
        const criteria = {
          _id: _id,
          email: email
        }
        const query = {
          password: pwdencript
        }
        const usrUpd = await User.update(criteria, query)
        if (usrUpd && usrUpd.ok === 1) {
          return resultOutputSuccess('password resetada com sucesso.')
        } else {
          return resultOutputError('ERROR RESET PASSWORD [ ** ocorreu um erro interno. não foi possivel resetar a password **  ]')
        }
      } else {
        return resultOutputError('ERROR ACCOUNT [ ** não foi encontrada nenhuma conta com o user_id **  ]')
      }
    }
    return resultOutputError('ERROR ACCOUNT [ ** utilizador inválido **  ]')
  },
  async codeValidator (user, code) {
    if (user) {
      const {_id} = user
      let accountCode = await this.querySelect({user_id: _id, code: code})
      if (accountCode && accountCode.length === 1) {
        return resultOutputDataOk(accountCode[0])
      } else {
        let err = ''
        accountCode = await this.querySelect({user_id: _id})
        if (accountCode && accountCode.length === 1) {
          err = 'O código de segurança que indicou não está correcto. Por favor verifique se esta a usar o código válido. Obrigado.'
        } else {
          err = 'ERROR ACCOUNT [ ** não foi encontrada nenhuma conta com o user_id **  ]'
        }
        return resultOutputError(err)
      }
    }
    return resultOutputError('ERROR ACCOUNT [ ** utilizador inválido **  ]')
  },
  async changeAccountNextStageByUser (user, nextStage) {
    if (user) {
      const {_id} = user
      const result = await this._changeAccountNextStage(_id, nextStage)
      return result
    }
    return resultOutputError('ERROR ACCOUNT [ ** utilizador inválido **  ]')
  },
  async changeAccountNextStageByEmail (email, nextStage) {
    const user = await this.checkAccountEmail(email)
    if (user) {
      const {_id} = user
      const result = await this._changeAccountNextStage(_id, nextStage)
      return result
    }
    return resultOutputError('ERROR ACCOUNT [ ** utilizador inválido **  ]')
  },
  async sendPredefinedMail (opt) {
    const result = await this._sendPredefinedMail(opt)
    return result
  }
}
