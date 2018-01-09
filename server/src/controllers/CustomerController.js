const tn = require('../utils/Utils').jwtToken
const ro = require('../utils/Utils').resultOutput
const {User, Customer} = require('../models')

async function fetchUserByEmail (id, email) {
  var user = null
  try {
    user = await User.findOne({'_id': id, 'email': email})
  } catch (error) {
    user = null
    console.log(error)
  }
  return user
}
async function fetchCustomer (user) {
  var costumer = null
  try {
    costumer = await Customer.findOne({'user_id': user._id})
  } catch (error) {
    costumer = null
    console.log(error)
  }
  return costumer
}
const instance = {
  options: {
    CUSTOMER_PROFILE: 6000,
    onFetchCustomerProfile: 6010
  },
  async fechCustomerProfile (payload) {
    var outdata = ro.resultOutputDataOk({})   
    try {
      if (!tn.tokenRequestVerify(payload.httpRequest)) {
        throw new Error('No permission to access this content.')
      }
      const {_id, email} = payload.REQ_INPUTS
      if (!_id) {
        throw new Error('User ID not valid')
      }
      if (!email) {
        throw new Error('User EMAIL not valid')
      }
      const user = await fetchUserByEmail(_id, email)
      if (!user) {
        throw new Error('User not found')
      }
      const customer = await fetchCustomer(user)
      if (!customer) {
        throw new Error('Customer not found')
      }
      outdata.success = 'Found Customer'
      outdata.data = customer
    } catch (error) {
      outdata.iook = false
      outdata.error = error.message
      outdata.data = null
    }
    return outdata
  }
}
module.exports = instance
