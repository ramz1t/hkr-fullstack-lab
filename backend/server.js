require('dotenv').config()
const app = require('./src/app')
const connectDB = require('./src/config/db')

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
} else {
    // Vercel serverless
    connectDB()
}

module.exports = app
