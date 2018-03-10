const User = require('../../models/member/user');
const router = require('express').Router();
const {ApiError} = require('../../api')

router.route('/register').post((req, res) => {
  const {unique_id, password, mobile, nickname, gender, email} = req.body

  if(!unique_id) res.json(new ApiError('unique_id is invalid'))
  const user = new User({unique_id, password, mobile, nickname, gender, email})
  user.save(err => {
    if (err) res.send(err)
    console.log(err)
    res.json({code: 200, message: 'register success'})
  })
});

module.exports = router