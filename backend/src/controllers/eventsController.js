const { Event } = require('../models')
const { Ticket } = require('../models')

const getAllEvents = async (req, res, next) => {
    try {
        const events = await Event.find().sort({ date: 1 })
        res.json({ success: true, data: events })
    } catch (err) {
        next(err)
    }
}

const getEventById = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id)
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' })
        }
        res.json({ success: true, data: event })
    } catch (err) {
        next(err)
    }
}

const createEvent = async (req, res, next) => {
    try {
        const event = await Event.create(req.body)
        res.status(201).json({ success: true, data: event })
    } catch (err) {
        next(err)
    }
}

const updateEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' })
        }
        if (req.body.status === 'cancelled') {
            await Ticket.updateMany(
                { event: req.params.id, status: 'active' },
                { status: 'cancelled' }
            )
        }
        res.json({ success: true, data: event })
    } catch (err) {
        next(err)
    }
}

const deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id)
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' })
        }
        res.json({ success: true, data: {} })
    } catch (err) {
        next(err)
    }
}

const getEventTickets = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id)
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' })
        }
        const tickets = await Ticket.find({ event: req.params.id }).populate(
            'attendee',
            'name email phone'
        )
        res.json({ success: true, data: tickets })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventTickets,
}
