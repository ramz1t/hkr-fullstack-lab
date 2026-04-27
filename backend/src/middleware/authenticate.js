const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticate = async (req, res, next) => {
    const auth = req.headers.authorization
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Not authenticated' })
    }
    try {
        const decoded = jwt.verify(auth.slice(7), process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        if (!user) {
            return res.status(401).json({ success: false, message: 'Not authenticated' })
        }
        req.user = user
        next()
    } catch {
        res.status(401).json({ success: false, message: 'Not authenticated' })
    }
}

module.exports = authenticate
