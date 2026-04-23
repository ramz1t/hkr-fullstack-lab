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

router.route('/').get(getAllAttendees).post(createAttendee)
router.route('/:id').get(getAttendeeById).put(updateAttendee).delete(deleteAttendee)
router.route('/:id/tickets').get(getAttendeeTickets)

module.exports = router
