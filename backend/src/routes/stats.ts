import { Router, Response } from 'express'
import User from '../models/User'
import Member from '../models/Member'
import Message from '../models/Message'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()

// Get dashboard stats (admin only)
router.get('/stats', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalMessages = await Message.countDocuments()
    
    const users = await User.find().select('-password').sort({ createdAt: -1 }).limit(5)
    const messages = await Message.find().sort({ createdAt: -1 }).limit(10)

    res.json({
      success: true,
      data: {
        totalUsers,
        totalMessages,
        users,
        messages,
      },
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

export default router
