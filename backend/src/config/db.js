const mongoose = require('mongoose')

let cached = global._mongooseConnection

const connectDB = async () => {
    if (cached && mongoose.connection.readyState === 1) {
        return cached
    }

    try {
        cached = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        })
        global._mongooseConnection = cached
        console.log(`MongoDB connected: ${mongoose.connection.host}`)
        return cached
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB
