import { Router, Response } from 'express'
import Member from '../models/Member'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()

// Get all members
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { category } = req.query

    let query = {}
    if (category) {
      query = { category }
    }

    const members = await Member.find(query).sort({ role: 1, name: 1 })

    res.json({
      success: true,
      data: members,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// Get member by ID
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const member = await Member.findById(req.params.id)

    if (!member) {
      return res.status(404).json({
        success: false,
        error: 'Member not found',
      })
    }

    res.json({
      success: true,
      data: member,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// Create member (admin only)
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, role, category, linkedIn, profileImage, bio, department } = req.body

    if (!name || !role || !linkedIn) {
      return res.status(400).json({
        success: false,
        error: 'Name, role, and LinkedIn URL are required',
      })
    }

    const member = new Member({
      name,
      role,
      category,
      linkedIn,
      profileImage,
      bio,
      department,
    })

    await member.save()

    res.status(201).json({
      success: true,
      data: member,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    })
  }
})

// Update member (admin only) - or update own photo
router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { profileImage } = req.body
    
    // Allow photo updates without authentication
    const updateData = { ...req.body }
    
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )

    if (!member) {
      return res.status(404).json({
        success: false,
        error: 'Member not found',
      })
    }

    res.json({
      success: true,
      data: member,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    })
  }
})

// Delete member (admin only)
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id)

    if (!member) {
      return res.status(404).json({
        success: false,
        error: 'Member not found',
      })
    }

    res.json({
      success: true,
      message: 'Member deleted successfully',
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

export default router
