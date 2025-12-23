import { Router, Response } from 'express'
import Message from '../models/Message'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()

// Create a new message (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required',
      })
    }

    const newMessage = new Message({
      name,
      email,
      subject,
      message,
    })

    await newMessage.save()

    res.status(201).json({
      success: true,
      data: newMessage,
      message: 'Message received! We will get back to you soon.',
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// Get all messages (admin only)
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })

    res.json({
      success: true,
      data: messages,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// Delete a message (admin only)
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id)

    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found',
      })
    }

    res.json({
      success: true,
      message: 'Message deleted',
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

export default router
