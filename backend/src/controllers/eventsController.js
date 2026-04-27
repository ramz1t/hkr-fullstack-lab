const { Event } = require('../models')
const { Ticket } = require('../models')
const isOwner = require('../utils/isOwner')

const getAllEvents = async (req, res, next) => {
    try {
        const { status, search } = req.query
        const filter = { scoped_to: req.user._id }
        if (status) filter.status = status
        if (search) filter.title = { $regex: search, $options: 'i' }
        const events = await Event.find(filter).sort({ date: 1 })
        res.json({ success: true, data: events })
    } catch (err) {
        next(err)
    }
}

const getEventById = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id)
        if (!event) return res.status(404).json({ success: false, message: 'Event not found' })
        if (!isOwner(event, req.user._id, res)) return
        res.json({ success: true, data: event })
    } catch (err) {
        next(err)
    }
}

const createEvent = async (req, res, next) => {
    try {
        const event = await Event.create({ ...req.body, scoped_to: req.user._id })
        res.status(201).json({ success: true, data: event })
    } catch (err) {
        next(err)
    }
}

const updateEvent = async (req, res, next) => {
    try {
        const existing = await Event.findById(req.params.id)
        if (!existing) return res.status(404).json({ success: false, message: 'Event not found' })
        if (!isOwner(existing, req.user._id, res)) return
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        if (req.body.status === 'cancelled') {
            await Ticket.updateMany(
                { event: req.params.id, status: 'active', scoped_to: req.user._id },
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
        const event = await Event.findById(req.params.id)
        if (!event) return res.status(404).json({ success: false, message: 'Event not found' })
        if (!isOwner(event, req.user._id, res)) return
        await Event.findByIdAndDelete(req.params.id)
        res.json({ success: true, data: {} })
    } catch (err) {
        next(err)
    }
}

const getEventTickets = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id)
        if (!event) return res.status(404).json({ success: false, message: 'Event not found' })
        if (!isOwner(event, req.user._id, res)) return
        const tickets = await Ticket.find({ event: req.params.id, scoped_to: req.user._id }).populate(
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
