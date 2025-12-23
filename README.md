# CSTR Website

Chemical Engineering Forum for Science Technology & Research at NITK

## Overview

A full-stack web application for CSTR club at NITK, built with Next.js (Frontend) and Express.js (Backend). This website serves as a platform for the Chemical Engineering department to organize events, share research, and foster community among members.

## Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: npm

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Language**: TypeScript

## Project Structure

```
CSTR/
├── src/                          # Frontend source
│   ├── app/                      # Next.js app directory
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Home page
│   │   └── globals.css
│   ├── components/               # React components
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   └── lib/                      # Utility functions
├── public/                       # Static assets
├── backend/                      # Backend API
│   ├── src/
│   │   ├── index.ts              # Server entry point
│   │   ├── models/               # Database schemas
│   │   │   ├── User.ts
│   │   │   └── Event.ts
│   │   ├── routes/               # API routes
│   │   │   └── events.ts
│   │   ├── controllers/          # Business logic
│   │   └── middleware/           # Express middleware
│   │       └── auth.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── postcss.config.js
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- MongoDB (local or Atlas)

### Frontend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   npm start
   ```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. **Navigate to backend**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** (copy from `.env.example`)
   ```bash
   cp .env.example .env
   ```

4. **Update MongoDB URI** in `.env`
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cstr
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

The backend API will be available at `http://localhost:5000`

## Features

### Current
- ✅ Responsive homepage with hero section
- ✅ About section with vision and mission
- ✅ Features showcase (Mentorship, Lectures, Research, Networking)
- ✅ Upcoming events display
- ✅ Professional navigation bar and footer
- ✅ Mobile-responsive design

### Backend
- ✅ Express server with CORS support
- ✅ MongoDB connection setup
- ✅ Event model and routes
- ✅ User model with password hashing
- ✅ JWT authentication middleware
- ✅ Error handling

### Planned Features
- 🔄 User authentication (signup/login)
- 🔄 Event registration system
- 🔄 Member profiles
- 🔄 Blog/Research articles
- 🔄 Gallery management
- 🔄 Newsletter subscription
- 🔄 Admin dashboard
- 🔄 Image upload
- 🔄 Email notifications

## API Endpoints

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event (auth required)
- `POST /api/events/:id/register` - Register for event (auth required)

### Health Check
- `GET /api/health` - API status

## Environment Variables

### Frontend
- No additional env vars required for development

### Backend
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cstr
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

## Development Workflow

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Terminal 1: Start Backend**
   ```bash
   cd backend
   npm run dev
   ```

3. **Terminal 2: Start Frontend**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   ```
   http://localhost:3000
   ```

## Available Scripts

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Backend
```bash
npm run dev          # Start dev server with nodemon
npm run build        # Compile TypeScript
npm start            # Start compiled app
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## Color Scheme

- **Primary**: `#1e40af` (Blue)
- **Secondary**: `#b8860b` (Gold/Yellow)
- **Accent**: `#059669` (Green)

## Contributing

1. Create a feature branch
2. Make your changes
3. Commit with clear messages
4. Push to branch
5. Submit pull request

## Deployment

### Frontend (Vercel)
```bash
npm run build
# Push to GitHub
# Connect repository to Vercel
```

### Backend (Heroku/Railway)
```bash
cd backend
npm run build
# Deploy with your hosting provider
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network access if using MongoDB Atlas

### Port Already in Use
- Frontend: `PORT=3001 npm run dev` (change port)
- Backend: `PORT=5001 npm run dev` (change in .env)

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## License

ISC

## Contact

Email: cstr@nitk.ac.in

---

**Happy coding! 🚀**
