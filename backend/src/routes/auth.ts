import { Router, Response } from 'express'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()

// Generate JWT Token
const generateToken = (userId: string) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key-change-this-in-production',
    { expiresIn: '7d' }
  )
}

// Signup
router.post('/signup', async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, password, department, year } = req.body

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and password are required',
      })
    }

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email',
      })
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      department,
      year,
      role: 'student',
    })

    await user.save()

    // Generate token
    const token = generateToken(user._id.toString())

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// Login
router.post('/login', async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required',
      })
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      })
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      })
    }

    // Generate token
    const token = generateToken(user._id.toString())

    res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        year: user.year,
      },
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// Get current user (protected)
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId).select('-password')

    res.json({
      success: true,
      data: user,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// Update user profile (protected)
router.put('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, bio, socialLinks } = req.body

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, bio, socialLinks },
      { new: true }
    ).select('-password')

    res.json({
      success: true,
      data: user,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

export default router
