##OrcAdmin
        Account Manager

        Obs. 

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




