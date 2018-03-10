const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  unique_id: {
    type: String,
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

module.exports = mongoose.model('User', UserSchema)