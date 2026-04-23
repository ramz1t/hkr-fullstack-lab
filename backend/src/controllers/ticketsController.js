const { Ticket, Event, Attendee } = require('../models')

const getAllTickets = async (req, res, next) => {
    try {
        const tickets = await Ticket.find()
            .populate('event', 'title date location status')
            .populate('attendee', 'name email')
        res.json({ success: true, data: tickets })
    } catch (err) {
        next(err)
    }
}

const getTicketById = async (req, res, next) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
            .populate('event', 'title date location status')
            .populate('attendee', 'name email phone')
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' })
        }
        res.json({ success: true, data: ticket })
    } catch (err) {
        next(err)
    }
}

const createTicket = async (req, res, next) => {
    try {
        const { event, attendee } = req.body

        const [eventExists, attendeeExists] = await Promise.all([
            Event.findById(event),
            Attendee.findById(attendee),
        ])

        if (!eventExists) {
            return res.status(404).json({ success: false, message: 'Event not found' })
        }
        if (!attendeeExists) {
            return res.status(404).json({ success: false, message: 'Attendee not found' })
        }

        const ticket = await Ticket.create(req.body)
        res.status(201).json({ success: true, data: ticket })
    } catch (err) {
        next(err)
    }
}

const updateTicket = async (req, res, next) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' })
        }
        res.json({ success: true, data: ticket })
    } catch (err) {
        next(err)
    }
}

const deleteTicket = async (req, res, next) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id)
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' })
        }
        res.json({ success: true, data: {} })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
}
