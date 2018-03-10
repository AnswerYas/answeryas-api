const User = require('../../models/member/user');
const router = require('express').Router();
const {ApiError} = require('../../api')

router.route('/register').post((req, res) => {
  const {unique_id, password, repassword, mobile, nickname, gender, email} = req.body

  if(!unique_id) {
    res.send(new ApiError('unique_id is required', 1001))
    return
  }

  if(!password) {
    res.json(new ApiError('password is required', 1002))
    return
  }

  if(password !== password) {
    res.json(new ApiError('password does not equal repassword', 1003))
  }

  const user = new User({unique_id, password, mobile, nickname, gender, email})
  user.save(err => {
    if (err) res.send(err)
    console.log(err)
    res.json({code: 200, message: 'register success'})
  })
});

module.exports = router