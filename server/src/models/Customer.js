const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accountSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, required: true},
  firstName: {type: String},
  lastName: {type: String},
  birthDate: {type: Date},
  gender: {type: String},
  nid: {type: String},
  nif: {type: String},
  nib: {type: String},
  street: {type: String},
  zipcode: {type: String},
  city: {type: String},
  country: {type: String},
  email: {type: String, required: true},
  phoneNumber: {type: String},
  mobileNumber: {type: String},
  dateCreated: {type: Date},
  dateUpdated: {type: Date}
})

module.exports = mongoose.model('Customer', accountSchema)
