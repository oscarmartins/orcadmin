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
          accountStatus : 0,
          nextStep : 0,
          code : '',
          dateCreated : date,
          dateUpdated : date
        }
       
        ACCOUNTS.accountStatus OR ACCOUNTS.nextStep
            const accountValid = 101010
            const onAccountValidation = 10000
            const onAccountValidationCode = 11000
            const onPasswordRecovery = 20000
            const onPasswordRecoveryCode = 21000
            const onPasswordRecoveryChange = 22000

        Logic Modes
          Mode.Signup: 
                  {user input validation passed}
                  1. create new user 
                  2. create new account by (user_id = userid & code = null  & accountStatus = onAccountValidation & nextStep = onAccountValidationCode)
                  3. send email info new user created
          Mode.Signin: 
                {user input validation trusted}
                1. [check account state] 
                  1.2. if (accountStatus equals onAccountValidation && nextStep equals onAccountValidationCode) 
                    1.2.1 var newCode = generateNewCode()
                    1.2.2 update ACCOUNTS by (user_id = userid & code = newCode & accountStatus = onAccountValidationCode) 
                    1.2.3 send email : newCode
                    1.2.4 return false
                  1.3. if (accountStatus equals onAccountValidationCode && nextStep equals onAccountValidationCode)
                    1.3.1 var codeIsValid = verifyCodeValidatorIsValid()
                    1.3.2 if codeIsValid ? (update ACCOUNTS by (user_id = userid & code = null & accountStatus = accountValid & nextStep = accountValid)) : return false
                    1.3.3 send email info: 'account is valid'
                    1.3.4 return true
                  1.4. if ( (accountStatus equals onPasswordRecovery && nextStep equals onPasswordRecovery) || 
                            (accountStatus equals onPasswordRecovery && nextStep equals onPasswordRecoveryCode) ||
                            (accountStatus equals onPasswordRecovery && nextStep equals onPasswordRecoveryChange))          
                    1.4.4 redirect(/passwordRecovery)        
                    1.4.5 return false
                  1.5. if (accountStatus equals accountValid && nextStep equals accountValid)
                    1.5.1 return true
          Mode.PasswordRecovery
                1. [check account state]
                  1.2. if ((accountStatus equals accountValid && nextStep equals accountValid) || 
                            (accountStatus equals onAccountValidation && nextStep equals onAccountValidation) || 
                            (accountStatus equals onAccountValidation && nextStep equals onAccountValidationCode) || 
                            (accountStatus equals onAccountValidationCode && nextStep equals onAccountValidationCode))
                    1.2.2 var newCode = generateNewCode()
                    1.2.3 update ACCOUNTS by (user_id = userid & code = null & accountStatus = onPasswordRecovery & nextStep = onPasswordRecovery)
                    1.2.4 send email : newCode
                    1.2.5 return false
                  1.3 if (accountStatus equals onPasswordRecovery && nextStep equals onPasswordRecoveryCode)
                    1.3.1 var codeIsValid = verifyCodeValidatorIsValid()
                    1.3.2 if (codeIsValid ? update ACCOUNTS by (user_id = userid & code = null  & accountStatus = onPasswordRecovery & nextStep = onPasswordRecoveryChange) )
                    1.3.3 return false
                  1.4 if (accountStatus equals onPasswordRecovery && nextStep equals onPasswordRecoveryChange)
                    1.4.1 {password's confirmed}
                    1.4.2 update USER password 
                    1.4.3 update ACCOUNTS by user_id = userid & code = null  & accountStatus = accountValid & nextStep = accountValid
                    1.4.4 send email info 'password recovery success'
                    1.4.5 return true





        

        




