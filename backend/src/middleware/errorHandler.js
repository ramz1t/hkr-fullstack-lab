const errorHandler = (err, req, res, next) => {
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = {}
        for (const [field, e] of Object.entries(err.errors)) {
            if (e.kind === 'required') errors[field] = `${field} is required`
            else if (e.kind === 'enum') errors[field] = `Invalid value for ${field}`
            else errors[field] = e.message
        }
        return res.status(400).json({ success: false, message: 'Validation failed', errors })
    }

    // Mongoose duplicate key
    // https://medium.com/design-bootcamp/resolving-duplicate-key-errors-in-mongodb-and-mongoose-a-practical-guide-d953f3f16577
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0]
        return res.status(400).json({ success: false, message: `${field} already exists` })
    }

    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    })
}

module.exports = errorHandler
