const express = require('express')
const router = express.Router()

router.use('/events', require('./events'))
router.use('/attendees', require('./attendees'))
router.use('/tickets', require('./tickets'))

module.exports = router
