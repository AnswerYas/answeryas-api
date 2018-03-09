const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RegisterSchema = new Schema({
  unique_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  mobile: String,
  email: String,
  nickname: String,
  gender: String,
})

module.exports = mongoose.model('Register', RegisterSchema)