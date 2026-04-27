const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')

router.use('/auth', require('./auth'))

// all routes below require a valid jwt
router.use(authenticate)

router.use('/events', require('./events'))
router.use('/attendees', require('./attendees'))
router.use('/tickets', require('./tickets'))

module.exports = router
