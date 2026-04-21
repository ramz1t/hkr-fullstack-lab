const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema(
    {
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: [true, 'Event is required'],
        },
        attendee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Attendee',
            required: [true, 'Attendee is required'],
        },
        type: {
            type: String,
            enum: ['General', 'VIP'],
            default: 'General',
        },
        status: {
            type: String,
            enum: ['active', 'cancelled'],
            default: 'active',
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Ticket', ticketSchema)
