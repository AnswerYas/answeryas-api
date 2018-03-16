const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  unique_id: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: String,
  mobile: String,
  email: String,
  nickname: String,
  gender: String,
});

UserSchema.pre('save', function(next) {
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        this.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};


module.exports = mongoose.model('User', UserSchema);
