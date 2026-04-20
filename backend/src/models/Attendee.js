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
            unique: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Attendee', attendeeSchema)
