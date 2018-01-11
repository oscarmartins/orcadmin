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

const CUSTOMER = {
  user_id: null,
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
  mobileNumber: null,
  dateCreated: null,
  dateUpdated: null
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
          const iores = await Customer.find({user_id: user._id}, (err, customer) => {
            if (err) {
              throw new Error(err.message)
            }
            return customer
          })
          let _customer = null
          if (!iores || iores.length === 0) {
            _customer = new Customer(fields)
            _customer.user_id = user._id
            _customer.dateCreated = new Date()
            _customer.dateUpdated = new Date()
            await _customer.save()
          } else {
            if (iores.length === 1) {
              _customer = iores[0]
              _customer.firstName = fields.firstName
              _customer.lastName = fields.lastName
              _customer.gender = fields.gender
              _customer.birthDate = fields.birthDate
              _customer.nid = fields.nid || null
              _customer.nif = fields.nib || null
              _customer.nib = fields.nib || null
              _customer.street = fields.street
              _customer.zipcode = fields.zipcode
              _customer.city = fields.city
              _customer.country = fields.country
              _customer.email = fields.email
              _customer.phoneNumber = fields.phoneNumber || null
              _customer.mobileNumber = fields.mobileNumber || null
              _customer.dateUpdated = Date.now()
              await Customer.update({user_id: user._id}, fields)
            }
          }

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
