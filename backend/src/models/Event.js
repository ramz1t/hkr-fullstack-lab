const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        date: {
            type: Date,
            required: [true, 'Date is required'],
        },
        location: {
            type: String,
            trim: true,
        },
        capacity: {
            type: Number,
            min: [0, 'Capacity cannot be negative'],
        },
        status: {
            type: String,
            enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
            default: 'upcoming',
        },
        scoped_to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User scope is required'],
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Event', eventSchema)
