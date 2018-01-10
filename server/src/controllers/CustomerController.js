const tn = require('../utils/Utils').jwtToken
const ro = require('../utils/Utils').resultOutput
const {User, Customer} = require('../models')
const joipolicy = require('joi')

const schemaPolicy = joipolicy.object().options({ abortEarly: true }).keys({
  email: joipolicy.string().email().required(),
  firstName: joipolicy.string().required(),
  lastName: joipolicy.string().required(),
  birthDate: joipolicy.string().required(),
  mobileNumber: joipolicy.number().integer().required()
})

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
    const {error} = schemaPolicy.validate(fields, {presence: 'required'})
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
          const iores = await Customer.findById(user._id, (err, customer) => {
            if (err) {
              console.log(err)
            }
            if (customer) {
              customer.firstName = fields.firstName
              customer.lastName = fields.lastName
              customer.gender = fields.gender
              customer.birthDate = fields.birthDate
              customer.nid = fields.nid
              customer.nif = fields.nib
              customer.nib = fields.nib
              customer.street = fields.street
              customer.zipcode = fields.zipcode
              customer.city = fields.city
              customer.country = fields.country
              customer.email = fields.email
              customer.phoneNumber = fields.phoneNumber
              customer.mobileNumber = fields.mobileNumber
              customer.dateUpdated = new Date()
              customer.save((err, customer) => {
                if (err) {
                  console.log(err)
                }
              })
            }
            return customer
          })
          if (!iores) {
            const _customer = new Customer(fields)
            _customer.user_id = user._id
            _customer.dateCreated = new Date()
            _customer.dateUpdated = new Date()
            _customer.save((err, customer) => {
              if (err) {
                console.log(err)
              }
            })
          }
          outdata.success = 'Found Customer'
          outdata.data = {}
        }
      }
    } catch (error) {
      outdata.iook = false
      outdata.error = error.message
      outdata.data = null
    }
    return outdata
  }
}
module.exports = instance
