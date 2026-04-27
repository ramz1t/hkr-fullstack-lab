const { Attendee } = require('../models')
const { Ticket } = require('../models')
const isOwner = require('../utils/isOwner')

const getAllAttendees = async (req, res, next) => {
    try {
        const attendees = await Attendee.find({ scoped_to: req.user._id }).sort({ name: 1 })
        res.json({ success: true, data: attendees })
    } catch (err) {
        next(err)
    }
}

const getAttendeeById = async (req, res, next) => {
    try {
        const attendee = await Attendee.findById(req.params.id)
        if (!attendee) return res.status(404).json({ success: false, message: 'Attendee not found' })
        if (!isOwner(attendee, req.user._id, res)) return
        res.json({ success: true, data: attendee })
    } catch (err) {
        next(err)
    }
}

const createAttendee = async (req, res, next) => {
    try {
        const attendee = await Attendee.create({ ...req.body, scoped_to: req.user._id })
        res.status(201).json({ success: true, data: attendee })
    } catch (err) {
        next(err)
    }
}

const updateAttendee = async (req, res, next) => {
    try {
        const existing = await Attendee.findById(req.params.id)
        if (!existing) return res.status(404).json({ success: false, message: 'Attendee not found' })
        if (!isOwner(existing, req.user._id, res)) return
        const attendee = await Attendee.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        res.json({ success: true, data: attendee })
    } catch (err) {
        next(err)
    }
}

const deleteAttendee = async (req, res, next) => {
    try {
        const attendee = await Attendee.findById(req.params.id)
        if (!attendee) return res.status(404).json({ success: false, message: 'Attendee not found' })
        if (!isOwner(attendee, req.user._id, res)) return
        await Attendee.findByIdAndDelete(req.params.id)
        res.json({ success: true, data: {} })
    } catch (err) {
        next(err)
    }
}

const getAttendeeTickets = async (req, res, next) => {
    try {
        const attendee = await Attendee.findById(req.params.id)
        if (!attendee) return res.status(404).json({ success: false, message: 'Attendee not found' })
        if (!isOwner(attendee, req.user._id, res)) return
        const tickets = await Ticket.find({ attendee: req.params.id, scoped_to: req.user._id }).populate(
            'event',
            'title date location status'
        )
        res.json({ success: true, data: tickets })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllAttendees,
    getAttendeeById,
    createAttendee,
    updateAttendee,
    deleteAttendee,
    getAttendeeTickets,
}
