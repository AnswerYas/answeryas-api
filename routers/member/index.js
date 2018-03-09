const authRutes = require('./auth')
const bearRoutes = require('./bear')
const router = require('express').Router()

router.use(authRutes)
router.use(bearRoutes)

module.exports = router