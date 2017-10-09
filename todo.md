##OrcAdmin
Account flow

        Account Registration
        Account Activation 
                -> onActivation (status:3000)
        Account Password Recovery 
                -> onPassRecovery (status:2000)
        activated (status:1000)

       AccountStatus {
           userId, 
           userEmail, 
           status, 
           code,
           updated,
           created 
       }

       sentCode () {

       }

       generateCode () {

       }

       validateCode () {

       }

       onActivation () {

       }

       onPassRecovery () {

       }
       
      