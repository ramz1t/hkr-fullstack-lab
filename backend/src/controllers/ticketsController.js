const e = require('express')
const { Ticket, Event, Attendee } = require('../models')
const isOwner = require('../utils/isOwner')

const getAllTickets = async (req, res, next) => {
    try {
        const tickets = await Ticket.find({ scoped_to: req.user._id })
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
        if (!ticket) return res.status(404).json({ success: false, message: 'Ticket not found' })
        if (!isOwner(ticket, req.user._id, res)) return
        res.json({ success: true, data: ticket })
    } catch (err) {
        next(err)
    }
}

const createTicket = async (req, res, next) => {
    try {
        const { event: event_id, attendee: attendee_id } = req.body

        const [event, attendee, existingTicketsCount] = await Promise.all([
            Event.findOne({ _id: event_id, scoped_to: req.user._id }),
            Attendee.findOne({ _id: attendee_id, scoped_to: req.user._id }),
            Ticket.countDocuments({ event: event_id, status: 'active', scoped_to: req.user._id }),
        ])

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' })
        }
        if (!attendee) {
            return res.status(404).json({ success: false, message: 'Attendee not found' })
        }

        if (!isOwner(event, req.user._id, res)) return
        if (!isOwner(attendee, req.user._id, res)) return

        if (existingTicketsCount + 1 > event.capacity) {
            return res.status(400).json({ success: false, message: 'Event has no more siting capacity' })
        }

        const ticket = await Ticket.create({ ...req.body, scoped_to: req.user._id })
        res.status(201).json({ success: true, data: ticket })
    } catch (err) {
        next(err)
    }
}

const updateTicket = async (req, res, next) => {
    try {
        const existing = await Ticket.findById(req.params.id)
        if (!existing) return res.status(404).json({ success: false, message: 'Ticket not found' })
        if (!isOwner(existing, req.user._id, res)) return
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
            .populate('event', 'title date location status')
            .populate('attendee', 'name email phone')
        res.json({ success: true, data: ticket })
    } catch (err) {
        next(err)
    }
}

const deleteTicket = async (req, res, next) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
        if (!ticket) return res.status(404).json({ success: false, message: 'Ticket not found' })
        if (!isOwner(ticket, req.user._id, res)) return
        await Ticket.findByIdAndDelete(req.params.id)
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
