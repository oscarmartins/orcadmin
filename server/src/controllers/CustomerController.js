const ro = require('../utils/Utils').resultOutput
const instance = {
  options: {
    CUSTOMER_PROFILE: 6000,
    onFetchCustomerProfile: 6010
  },
  async fechCustomerProfile (payload) {
    return ro.resultOutputSuccess('testes')
  }
}
module.exports = instance
