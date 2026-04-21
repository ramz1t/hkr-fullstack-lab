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

router.route('/').get(getAllEvents).post(createEvent)
router.route('/:id').get(getEventById).put(updateEvent).delete(deleteEvent)
router.route('/:id/tickets').get(getEventTickets)

module.exports = router
