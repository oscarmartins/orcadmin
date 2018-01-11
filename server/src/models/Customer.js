const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accountSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, required: true, unique: true, sparse: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  birthDate: {type: String, required: true},
  gender: {type: String},
  nid: {type: String, unique: true, sparse: true},
  nif: {type: String, unique: true, sparse: true},
  nib: {type: String, unique: true, sparse: true},
  street: {type: String},
  zipcode: {type: String},
  city: {type: String},
  country: {type: String},
  email: {type: String, required: true, unique: true, sparse: true},
  phoneNumber: {type: String, unique: true, sparse: true},
  mobileNumber: {type: String, required: true, unique: 'mobileNumber', sparse: true},
  dateCreated: {type: Date},
  dateUpdated: {type: Date}
})

module.exports = mongoose.model('Customer', accountSchema)
