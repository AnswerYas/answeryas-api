const Register = require('../../models/member/auth');
const router = require('express').Router();

router.route('/register').post((req, res) => {
  let register = new Register()
  const params = {unique_id, password, mobile, nickname, gender, email}
  params = req.body
  register = {...register, ...params}
  register.save(err => {
    if (err) res.send(err)
    res.json({code: 200, message: 'register success'})
  })
});

module.exports = router