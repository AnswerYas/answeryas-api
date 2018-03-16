const User = require('../../models/member/user');
const router = require('express').Router();
const {ApiError} = require('../../api')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config  = require('../../config')
const passport = require('passport')
require('../../passport.config')(passport)

router.route('/register').post((req, res) => {
  const {unique_id, password, mobile, nickname, gender, email} = req.body

  if(!unique_id) {
    res.status(400).send(new ApiError(1001, 'unique_id is required'))
    return
  }

  if(!password) {
    res.status(400).send(new ApiError(1002, 'password is required'))
    return
  }

  User.findOne({unique_id}, (err, doc) => {
    if (doc) {
      res.status(400).send(new ApiError(1004, 'user does exit'))
      return
    }

    const user = new User({unique_id, password, mobile, nickname, gender, email})
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    user.token = token;
    user.save(err => {
      if (err) res.status(500).send(err)
      res.status(200).json({token})
    })
  })
});

router.route('/login').post((req, res) => {
  const {unique_id, password} = req.body
  
  if(!unique_id) {
    res.status(400).send(new ApiError(1001, 'unique_id is required'))
    return
  }

  if(!password) {
    res.status(400).send(new ApiError(1002, 'password is required'))
    return
  }

  User.findOne({unique_id}, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    user.comparePassword(password, (err, isMatch) => {
      console.log(err)
      if(err) {
        return res.status(400).json(err)
      }
      if (!isMatch) {
        return res.status(400).send({code: 1003, message: 'password does not match' })
      }
      const token = jwt.sign({unique_id}, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      user.token = token
      user.save(err => {
        if(err) {
          return res.status(500).send('Error on the server.')
        }
        res.status(200).json({token})
      })
    })
  });
})

router.route('/profile').get(passport.authenticate('bearer', { session: false }),(req, res, next) => {
  const {unique_id, mobile, email, nickname, gender} = req.user
  res.status(200).json({unique_id, mobile, email, nickname, gender})
})

module.exports = router