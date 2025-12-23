# VS Code Copilot Instructions for CSTR Project

This document provides guidance for working on the CSTR website project.

## Project Overview

CSTR (Chemical Engineering Forum for Science Technology & Research) is a full-stack web application for a college club at NITK. It combines a Next.js frontend with an Express.js backend.

## Technology Stack

**Frontend:**
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- React 18

**Backend:**
- Node.js with Express
- MongoDB
- TypeScript
- JWT Authentication

## File Structure Guide

### Frontend Files
- `/src/app/` - Next.js app directory (pages, layouts)
- `/src/components/` - Reusable React components
- `/src/lib/` - Utility functions and helpers
- `/public/` - Static assets (images, icons, etc.)

### Backend Files
- `/backend/src/index.ts` - Server entry point
- `/backend/src/models/` - MongoDB schemas
- `/backend/src/routes/` - API route handlers
- `/backend/src/controllers/` - Business logic
- `/backend/src/middleware/` - Express middleware

## Common Tasks

### Adding a New Page
1. Create file in `/src/app/[name]/page.tsx`
2. Add link in Navbar component
3. Create page layout and content

### Adding a New Component
1. Create in `/src/components/[category]/[Name].tsx`
2. Export as default
3. Import and use in pages

### Adding Backend Route
1. Create route file in `/backend/src/routes/`
2. Import in `backend/src/index.ts`
3. Use `app.use()` to register route
4. Test with API client (Postman, VS Code REST Client)

### Database Operations
1. Update model in `/backend/src/models/`
2. Create controller in `/backend/src/controllers/`
3. Add route in `/backend/src/routes/`
4. Test endpoint

## Development Commands

Frontend:
```bash
npm run dev              # Start dev server (port 3000)
npm run build           # Build for production
npm run lint            # Check code style
npm run type-check      # Run TypeScript checks
```

Backend:
```bash
cd backend
npm run dev             # Start with auto-reload (port 5000)
npm run build           # Compile TypeScript
npm start               # Run compiled version
npm run type-check      # Check types
```

## Important Notes

1. **Environment Variables**
   - Backend needs `.env` file (see `.env.example`)
   - Frontend can use next.config.js for env vars

2. **Database**
   - MongoDB must be running before starting backend
   - Connection string in `.env`: `MONGODB_URI`

3. **Authentication**
   - JWT tokens required for protected routes
   - Token sent in `Authorization: Bearer <token>` header

4. **Color Scheme**
   - Primary Blue: `#1e40af`
   - Secondary Gold: `#b8860b`
   - Accent Green: `#059669`

5. **Styling**
   - Use Tailwind classes for styling
   - Custom colors defined in `tailwind.config.ts`

## TypeScript Standards

- Always add type annotations for function parameters
- Use interfaces for database models
- Export types from model files
- Use `as const` for literal types

## Code Style

- Use functional components in React
- Use `'use client'` for client-side components
- Follow ESLint rules
- Keep components focused and single-purpose

## Testing

For API testing:
- Use Postman or REST Client extension
- Base URL: `http://localhost:5000/api`
- Include JWT token in Authorization header for protected routes

## Next Features to Implement

1. User authentication (signup/login pages)
2. Member profiles page
3. Admin dashboard for event management
4. Blog/Articles section
5. Gallery component
6. Newsletter signup
7. Contact form
8. Search functionality

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Express Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Tailwind CSS](https://tailwindcss.com/)

## Support

For issues or questions, refer to:
1. Project README.md
2. Component/file comments
3. Git commit messages for context
