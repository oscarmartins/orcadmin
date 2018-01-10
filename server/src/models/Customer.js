const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accountSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, required: true, unique: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  birthDate: {type: Date, required: true},
  gender: {type: String},
  nid: {type: String, unique: true},
  nif: {type: String, unique: true},
  nib: {type: String, unique: true},
  street: {type: String},
  zipcode: {type: String},
  city: {type: String},
  country: {type: String},
  email: {type: String, required: true, unique: true},
  phoneNumber: {type: String, unique: true},
  mobileNumber: {type: String, required: true, unique: true},
  dateCreated: {type: Date},
  dateUpdated: {type: Date}
})

module.exports = mongoose.model('Customer', accountSchema)
