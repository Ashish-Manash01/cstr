import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth'
import eventsRoutes from './routes/events'
import membersRoutes from './routes/members'
import messagesRoutes from './routes/messages'
import statsRoutes from './routes/stats'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database Connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cstr'
    await mongoose.connect(mongoUri)
    console.log('✓ MongoDB connected successfully')
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error)
    process.exit(1)
  }
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date() })
})

// Auth routes
app.use('/api/auth', authRoutes)

// Events routes
app.use('/api/events', eventsRoutes)

// Members routes
app.use('/api/members', membersRoutes)

// Messages routes
app.use('/api/messages', messagesRoutes)

// Stats routes (admin dashboard)
app.use('/api/stats', statsRoutes)

// Initialize
connectDB()

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`)
})
