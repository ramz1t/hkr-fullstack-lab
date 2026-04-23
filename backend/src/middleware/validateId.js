const mongoose = require('mongoose')

const validateId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ success: false, message: 'Resource not found' })
    }
    next()
}

module.exports = validateId
