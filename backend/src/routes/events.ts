import { Router, Response } from 'express'
import Event from '../models/Event'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()

// Get all events
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const events = await Event.find()
      .sort({ date: 1 })
      .populate('attendees', 'name email')

    res.json({
      success: true,
      data: events,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// Get event by ID
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees', 'name email')

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found',
      })
    }

    res.json({
      success: true,
      data: event,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// Create event (admin only)
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const event = new Event(req.body)
    await event.save()

    res.status(201).json({
      success: true,
      data: event,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    })
  }
})

// Register for event
router.post('/:id/register', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found',
      })
    }

    if (!event.attendees.includes(req.userId as any)) {
      event.attendees.push(req.userId as any)
      await event.save()
    }

    res.json({
      success: true,
      message: 'Successfully registered for event',
      data: event,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

export default router
