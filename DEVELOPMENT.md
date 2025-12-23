# CSTR Website - Development Guide

A comprehensive guide for developing the CSTR website with best practices and examples.

## Table of Contents

1. [Frontend Development](#frontend-development)
2. [Backend Development](#backend-development)
3. [Database Design](#database-design)
4. [Authentication](#authentication)
5. [API Integration](#api-integration)
6. [Deployment](#deployment)

---

## Frontend Development

### Project Structure

```
src/
├── app/                           # Next.js 14 App Router
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   ├── globals.css                # Global styles
│   └── [feature]/                 # Feature folders
│       └── page.tsx
├── components/                    # Reusable components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── common/                    # Shared components
│   ├── features/                  # Feature components
│   └── ui/                        # UI components
└── lib/                           # Utilities
    └── api.ts                     # API client
```

### Creating a New Page

**File: `src/app/about/page.tsx`**
```typescript
'use client'

import { useEffect, useState } from 'react'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-8">About CSTR</h1>
          <p className="text-lg text-gray-700">
            Your content here
          </p>
        </div>
      </section>
    </main>
  )
}
```

### Creating a Component

**File: `src/components/common/Button.tsx`**
```typescript
interface ButtonProps {
  label: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export default function Button({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false 
}: ButtonProps) {
  const baseStyles = 'font-bold py-2 px-4 rounded transition'
  const variants = {
    primary: 'bg-primary text-white hover:opacity-90',
    secondary: 'bg-secondary text-white hover:opacity-90'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
```

### Using the API Client

**File: `src/app/events/page.tsx`**
```typescript
'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

interface Event {
  _id: string
  title: string
  date: string
  location: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events')
        setEvents(response.data.data)
      } catch (error) {
        console.error('Failed to fetch events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <main>
      <div className="grid md:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event._id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold">{event.title}</h3>
            <p className="text-gray-600">{event.date}</p>
            <p className="text-gray-600">{event.location}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
```

### Styling with Tailwind

```typescript
// Use utility classes
<div className="max-w-7xl mx-auto px-4 py-8">
  <h1 className="text-5xl font-bold text-primary mb-4">Title</h1>
  <p className="text-lg text-gray-700 leading-relaxed">Paragraph</p>
</div>

// Responsive design
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Content */}
</div>

// Custom colors
<div className="bg-primary text-secondary border-2 border-accent">
  Colored content
</div>
```

---

## Backend Development

### Project Structure

```
backend/
├── src/
│   ├── index.ts                   # Entry point
│   ├── models/                    # Database schemas
│   │   ├── User.ts
│   │   ├── Event.ts
│   │   └── Article.ts
│   ├── routes/                    # API routes
│   │   ├── events.ts
│   │   ├── users.ts
│   │   └── articles.ts
│   ├── controllers/               # Business logic
│   │   └── eventController.ts
│   └── middleware/                # Middleware
│       └── auth.ts
├── package.json
└── tsconfig.json
```

### Creating a New Route

**File: `backend/src/routes/articles.ts`**
```typescript
import { Router, Response } from 'express'
import Article from '../models/Article'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()

// Get all articles
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const articles = await Article.find()
      .sort({ createdAt: -1 })
      .populate('author', 'name')

    res.json({
      success: true,
      data: articles
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Create article (auth required)
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const article = new Article({
      ...req.body,
      author: req.userId
    })
    await article.save()

    res.status(201).json({
      success: true,
      data: article
    })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

export default router
```

### Register Route in Server

**File: `backend/src/index.ts`**
```typescript
import articlesRouter from './routes/articles'

// ... other middleware

app.use('/api/articles', articlesRouter)
```

### Creating a Model

**File: `backend/src/models/Article.ts`**
```typescript
import mongoose, { Schema, Document } from 'mongoose'

export interface IArticle extends Document {
  title: string
  content: string
  author: mongoose.Types.ObjectId
  tags: string[]
  published: boolean
  createdAt: Date
  updatedAt: Date
}

const articleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    tags: [String],
    published: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

export default mongoose.model<IArticle>('Article', articleSchema)
```

---

## Database Design

### User Model

```typescript
{
  name: string,
  email: string (unique),
  password: string (hashed),
  role: 'student' | 'mentor' | 'admin',
  department: string,
  year: number (1-4),
  photo: string (URL),
  bio: string,
  socialLinks: {
    linkedin: string,
    github: string
  },
  eventsAttended: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Event Model

```typescript
{
  title: string,
  description: string,
  date: Date,
  time: string,
  location: string,
  category: 'seminar' | 'workshop' | 'networking' | 'conference',
  image: string (URL),
  attendees: [ObjectId],
  maxCapacity: number,
  createdAt: Date,
  updatedAt: Date
}
```

### Article Model

```typescript
{
  title: string,
  content: string,
  author: ObjectId,
  tags: [string],
  published: boolean,
  views: number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Authentication

### JWT Implementation

**File: `backend/src/middleware/auth.ts`**
```typescript
import jwt from 'jsonwebtoken'

const generateToken = (userId: string) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '7d' }
  )
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'No token' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    req.userId = (decoded as any).userId
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}
```

### Login Endpoint

```typescript
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })
  
  const isValid = await user.comparePassword(password)
  if (!isValid) return res.status(401).json({ error: 'Invalid credentials' })
  
  const token = generateToken(user._id.toString())
  res.json({ token, user })
})
```

---

## API Integration

### Frontend API Calls

```typescript
import api from '@/lib/api'

// GET
const events = await api.get('/events')

// POST
const response = await api.post('/events', {
  title: 'New Event',
  date: '2024-01-15'
})

// PUT
await api.put(`/events/${id}`, { title: 'Updated' })

// DELETE
await api.delete(`/events/${id}`)

// With authentication (auto-attached)
const events = await api.get('/events/my-events')
```

---

## Deployment

### Frontend (Vercel)

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy automatically on push

### Backend (Railway/Heroku)

1. Install Railway CLI
2. Run `railway init`
3. Add environment variables
4. Deploy

```bash
cd backend
railway deploy
```

---

## Testing API Endpoints

### Using REST Client (VS Code Extension)

**File: `test.http`**
```http
### Get all events
GET http://localhost:5000/api/events

### Get single event
GET http://localhost:5000/api/events/123456

### Create event (with auth)
POST http://localhost:5000/api/events
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "New Event",
  "description": "Description",
  "date": "2024-01-15",
  "time": "10:00 AM",
  "location": "Room 101"
}
```

---

## Best Practices

1. **Type Everything** - Use TypeScript interfaces
2. **Handle Errors** - Always use try-catch
3. **Validate Input** - Check data before processing
4. **Use Environment Variables** - Never hardcode secrets
5. **Comment Complex Code** - Help future developers
6. **Keep Functions Small** - Single responsibility
7. **Test Endpoints** - Regular API testing
8. **Version Your API** - Use `/api/v1/` prefixes

---

## Common Issues & Solutions

### Issue: CORS errors
**Solution**: Add frontend URL to CORS config in backend
```typescript
app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com']
}))
```

### Issue: Token not persisting
**Solution**: Store token in localStorage
```typescript
localStorage.setItem('token', token)
```

### Issue: Mongoose validation errors
**Solution**: Add validation to schema
```typescript
const schema = new Schema({
  email: { type: String, required: true, match: /.+\@.+\..+/ }
})
```

---

For more help, refer to the main README.md and copilot-instructions.md files.
