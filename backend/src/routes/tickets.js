const express = require('express')
const router = express.Router()
const {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
} = require('../controllers/ticketsController')
const validateId = require('../middleware/validateId')

router.route('/').get(getAllTickets).post(createTicket)
router.route('/:id').all(validateId).get(getTicketById).put(updateTicket).delete(deleteTicket)

module.exports = router
