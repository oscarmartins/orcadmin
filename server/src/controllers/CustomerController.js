const tn = require('../utils/Utils').jwtToken
const ro = require('../utils/Utils').resultOutput
const {User, Customer} = require('../models')
const joipolicy = require('joi')

const schemaPolicy = joipolicy.object().options({ allowUnknown: true }).keys({
  email: joipolicy.string().email().required(),
  firstName: joipolicy.string().required(),
  lastName: joipolicy.string().required(),
  birthDate: joipolicy.string().required(),
  mobileNumber: joipolicy.number().integer().required()
})

const CUSTOMER = () => {
  return {
    firstName: null,
    lastName: null,
    birthDate: null,
    gender: null,
    nid: null,
    nif: null,
    nib: null,
    street: null,
    zipcode: null,
    city: null,
    country: null,
    email: null,
    phoneNumber: null,
    mobileNumber: null
  }
}

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
  customerPolicy: fields => {
    const {error} = schemaPolicy.validate(fields, {presence: 'required', allowUnknown: true})
    if (error) {
      throw new Error(error.details[0].message)
    }
    return true
  },
  options: {
    CUSTOMER_PROFILE: 6000,
    onFetchCustomerProfile: 6010,
    onUpdateCustomerProfile: 6020
  },
  tokenRequestVerify (payload) {
    if (!tn.tokenRequestVerify(payload.httpRequest)) {
      throw new Error('No permission to access this content.')
    }
    return true
  },
  async fechCustomerProfile (payload) {
    var outdata = ro.resultOutputDataOk({})
    try {
      if (instance.tokenRequestVerify(payload)) {
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
      }
    } catch (error) {
      outdata.iook = false
      outdata.error = error.message
      outdata.data = null
    }
    return outdata
  },
  async updateCustomerProfile (payload) {
    var outdata = ro.resultOutputDataOk({})
    try {
      if (instance.tokenRequestVerify(payload)) {
        const {user, fields} = payload.REQ_INPUTS
        if (instance.customerPolicy(fields)) {
          if (!user._id) {
            throw new Error('User ID not valid')
          }
          if (!user.email) {
            throw new Error('User EMAIL not valid')
          }
          if (!(await fetchUserByEmail(user._id, user.email))) {
            throw new Error('User not found')
          }
          if (!fields) {
            throw new Error('Customer fields not found')
          }

          const _customer = CUSTOMER()
          Object.keys(fields).forEach((key) => {
            const value = fields[key] || null
            _customer[key] = value
          })
          const criteria = {user_id: user._id}

          const custmUpd = await Customer.update(criteria, _customer)

          if (custmUpd.n === 1 && custmUpd.nModified === 1 && custmUpd.ok === 1) {
            console.log(1)
          } else {
            const docsave = new Customer(_customer)
            docsave.user_id = criteria.user_id
            docsave.dateCreated = Date.now()
            docsave.dateUpdated = Date.now()
            await docsave.save()
          }

          console.log(_customer)

          outdata.success = 'Customer updated'
          outdata.data = {}
        }
      }
    } catch (err) {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          const fieldName = err.errmsg.substring(err.errmsg.lastIndexOf('index:') + 7, err.errmsg.lastIndexOf('_1'))
          outdata.error = `O Campo ${fieldName} está registado em outra conta. `
        } else {
          outdata.error = err.message
        }
      } else {
        outdata.error = 'erro desconhecido'
      }
      outdata.iook = false
      outdata.data = null
    }
    return outdata
  }
}
module.exports = instance
