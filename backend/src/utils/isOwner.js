/**
 * Throws a 403 response if doc.scoped_to does not match userId.
 * Returns false if ownership is confirmed so callers can short-circuit.
 *
 * Usage in a controller:
 *   if (!isOwner(doc, req.user._id, res)) return
 */
const isOwner = (doc, userId, res) => {
    if (doc.scoped_to.toString() !== userId.toString()) {
        res.status(403).json({ success: false, message: 'Forbidden' })
        return false
    }
    return true
}

module.exports = isOwner
