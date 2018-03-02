const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BearSchema = new Schema({
  name: String
});

const UserSchema = new Schema({
  uniqueId: String,
  password: String
})

module.exports = mongoose.model('Bear', BearSchema);
