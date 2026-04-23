const express = require('express')
const router = express.Router()
const {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventTickets,
} = require('../controllers/eventsController')
const validateId = require('../middleware/validateId')

router.route('/').get(getAllEvents).post(createEvent)
router.route('/:id').all(validateId).get(getEventById).put(updateEvent).delete(deleteEvent)
router.route('/:id/tickets').all(validateId).get(getEventTickets)

module.exports = router
