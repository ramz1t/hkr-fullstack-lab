const mongoose = require('mongoose')

const attendeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        scoped_to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User scope is required'],
        },
    },
    { timestamps: true }
)

attendeeSchema.index({ email: 1, scoped_to: 1 }, { unique: true })

module.exports = mongoose.model('Attendee', attendeeSchema)
