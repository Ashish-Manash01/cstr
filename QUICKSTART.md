# CSTR Website - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js 16+ (download from [nodejs.org](https://nodejs.org))
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - free tier available)

### Step 1: Verify Installation
```bash
node --version  # Should show v16 or higher
npm --version   # Should show 8 or higher
```

### Step 2: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Download and install MongoDB Community Edition
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster
4. Get connection string
5. Update `MONGODB_URI` in `backend/.env`

### Step 3: Configure Environment

**Backend Setup**
```bash
cd backend
cp .env.example .env
# Edit .env and add your MongoDB URI
```

**Frontend Setup**
```bash
cd ..

cp .env.local.example .env.local
```

### Step 4: Install Dependencies

**Frontend** (from root directory)
```bash
npm install
```

**Backend** (in backend directory)
```bash
cd backend
npm install
cd ..
```

### Step 5: Run the Application

**Terminal 1: Backend Server**
```bash
cd backend
npm run dev
# You should see: ✓ Server running on http://localhost:5000
```

**Terminal 2: Frontend Application**
```bash
npm run dev
# You should see: ✓ Ready in XXXms
```

### Step 6: View the Website
Open your browser and go to:
```
http://localhost:3000
```

---

## 📁 What You Just Created

### Frontend Structure
```
src/
├── app/                    # Next.js pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/             # React components
│   └── layout/
│       ├── Navbar.tsx     # Navigation bar
│       └── Footer.tsx     # Footer
└── lib/
    └── api.ts             # API client
```

### Backend Structure
```
backend/
├── src/
│   ├── index.ts           # Server entry point
│   ├── models/            # Database schemas
│   │   ├── User.ts
│   │   └── Event.ts
│   ├── routes/            # API endpoints
│   │   └── events.ts
│   └── middleware/        # Authentication, etc.
│       └── auth.ts
└── package.json
```

---

## 🎨 Customization

### Change Project Name
Replace "CSTR" with your actual club name in:
- `src/app/layout.tsx` (metadata)
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `backend/src/index.ts` (comments)

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: '#your-color',      // Main color
  secondary: '#your-color',    // Accent 1
  accent: '#your-color',       // Accent 2
}
```

### Update Content
- Edit `src/app/page.tsx` for homepage content
- Modify sections (hero, about, features, events)
- Update footer information

---

## 🔧 Common Tasks

### Create New Page
1. Create folder: `src/app/new-page/`
2. Create file: `src/app/new-page/page.tsx`
3. Add link in `Navbar.tsx`

### Create New Component
1. Create file: `src/components/category/ComponentName.tsx`
2. Add content
3. Import in page: `import ComponentName from '@/components/category/ComponentName'`

### Add API Endpoint
1. Create file: `backend/src/routes/newroute.ts`
2. Define routes
3. Import in `backend/src/index.ts`:
```typescript
import newRoute from './routes/newroute'
app.use('/api/newroute', newRoute)
```

### Test API
1. Install [Postman](https://www.postman.com/downloads/) or [REST Client Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
2. Test endpoints:
```
GET http://localhost:5000/api/health
GET http://localhost:5000/api/events
```

---

## 📚 Available Commands

### Frontend
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Check code quality
npm run type-check       # Check TypeScript
```

### Backend
```bash
cd backend
npm run dev              # Start with auto-reload
npm run build            # Compile TypeScript
npm start                # Run production
npm run type-check       # Check TypeScript
```

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- ✓ Is MongoDB running? (`mongod` or MongoDB Atlas)
- ✓ Is `MONGODB_URI` correct in `backend/.env`?
- ✓ Do you have network access if using MongoDB Atlas?

### "Port 3000/5000 already in use"
```bash
# Change port
PORT=3001 npm run dev          # Frontend
PORT=5001 npm run dev          # Backend
```

### "Module not found" errors
```bash
# Reinstall dependencies
rm -rf node_modules backend/node_modules package-lock.json
npm install
cd backend && npm install
```

### Tailwind CSS not working
- Check that `globals.css` has `@tailwind` directives
- Run `npm run build` and restart dev server

---

## 🚀 Next Steps

1. **Create additional pages** (About, Events, Members, Contact)
2. **Setup authentication** (Signup/Login pages)
3. **Add event management** (Create, edit, delete events)
4. **Implement member profiles**
5. **Setup image upload**
6. **Add newsletter subscription**
7. **Deploy to production** (Vercel for frontend, Heroku/Railway for backend)

---

## 📖 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Tutorials](https://docs.mongodb.com/manual/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 💡 Tips

1. **Use TypeScript** - Catch errors early
2. **Keep components small** - Easier to test and reuse
3. **Comment your code** - Help future developers
4. **Test APIs regularly** - Use Postman or REST Client
5. **Commit to git** - Save your progress

---

## 🆘 Need Help?

- Check the main [README.md](./README.md)
- Review [copilot-instructions.md](./.github/copilot-instructions.md)
- Google the error message
- Ask in your college technical forum

---

## 📞 Contact

**Email**: cstr@nitk.ac.in

Happy coding! 🎉
