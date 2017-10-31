##OrcAdmin
        Account Manager
        Request Parameters: { REQ_CONTEX      REQ_ACTION      REQ_INPUTS }

        REQ_CONTEX
        1000 -> user_registration
        2000 -> login
        3000 -> account_verify
        4000 -> recovery_password

        REQ_ACTION
        1000:1010 -> createNewUser

        2000:2010 -> login

        3000:3010 -> checkAccount
        3000:3020 -> validateAccountEmail
        3000:3030 -> validateAccountCode

        4000:4010 -> recoveryPasswordEmail
        4000:4020 -> recoveryPasswordCode
        4000:4030 -> recoveryPasswordReset


        ACCOUNTS 
        {
        id : 0,
        user_id : 0,
        accountState : 0,
        nextStep : 0,
        code : '',
        dateCreated : date,
        dateUpdated : date
        }

        Logic Modes
          Mode.Signup: 
                  {user validation passed}
                  1. create new user 
                  2. create new account by userid and accountState = onAccountValidation and nextStep = onAccountValidationCode
                  3. send email info new user created
            Mode.Signin: 
                  {user validation trusted}
                  1. check account state 
                    1.2. if (accountState equals onAccountValidation && nextStep equals onAccountValidationCode) 
                      1.2.1 generate new code
                      1.2.2 update ACCOUNTS by userid + accountState = onAccountValidationCode 
                      1.2.3 send email plus code validator
                      1.2.4 return false
                    1.3. if (accountState equals onAccountValidationCode && nextStep equals onAccountValidationCode)
                      1.3.1 verify code validator is valid
                      1.3.2 if true? update ACCOUNTS by userid + accountState = accountValid + nextStep = accountValid
                      1.3.3 send email info account is valid
                      1.3.4 return true
                    1.4. if (accountState equals onPasswordRecovery && nextStep equals onPasswordRecovery)
                      1.4.1 if (mode.signin) ? return false : confirm input email exist
                      1.4.2 generate new code
                      1.4.3 update ACCOUNTS by userid + accountState = onPasswordRecovery + nextStep = onPasswordRecoveryCode
                      1.4.4 send email plus code validator password recovery
                      1.4.4 return false
                    1.5. if (accountState equals onPasswordRecovery && nextStep equals onPasswordRecoveryCode)
                      1.5.1 verify code validator is valid
                      1.5.2 if true update ACCOUNTS by userid + accountState = onPasswordRecoveryCode + nextStep = onPasswordRecoveryCode
                      1.5.3 send email plus code validator
                      1.5.4 return false
            Mode.RecoveryPassword
                  {validate input email passed}
                  1. check account state
                    1.2. if (accountState equals accountValid && nextStep equals accountValid)
                      1.2.1 generate new code
                      1.2.2 update ACCOUNTS by userid + accountState = onPasswordRecovery + nextStep = onPasswordRecoveryCode
                      1.2.3 return false
                    1.3 if (accountState equals onPasswordRecovery && nextStep equals onPasswordRecoveryCode)
                      1.3.1 verify code validator is valid
                      1.3.2 update ACCOUNTS by userid + accountState = onPasswordRecovery + nextStep = onPasswordRecoveryChange
                      1.3.3 return false
                    1.4 if (accountState equals onPasswordRecovery && nextStep equals onPasswordRecoveryChange)
                      1.4.1 {password's confirmed}
                      1.4.2 update USER password 
                      1.4.3 update ACCOUNTS by userid + accountState = accountValid + nextStep = accountValid
                      1.4.4 return true

        

        




