const express = require('express')
const router = express.Router()
const {
    getAllAttendees,
    getAttendeeById,
    createAttendee,
    updateAttendee,
    deleteAttendee,
    getAttendeeTickets,
} = require('../controllers/attendeesController')
const validateId = require('../middleware/validateId')

router.route('/').get(getAllAttendees).post(createAttendee)
router.route('/:id').all(validateId).get(getAttendeeById).put(updateAttendee).delete(deleteAttendee)
router.route('/:id/tickets').all(validateId).get(getAttendeeTickets)

module.exports = router
