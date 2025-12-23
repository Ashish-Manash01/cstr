# MongoDB Setup Guide for CSTR

## ⚠️ MongoDB Connection Error

The error shows MongoDB is not running. Choose one of these options:

---

## ✅ Option 1: MongoDB Atlas (Cloud - Recommended)

**Best for:** Easy setup, no local installation needed

### Steps:

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Click "Try Free"
   - Sign up with email

2. **Create Cluster**
   - Click "Create a Deployment"
   - Choose "Free" tier
   - Select region closest to you (India)
   - Click "Create"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `cstr_user`
   - Password: (generate strong password or use yours)
   - Click "Create User"

4. **Add IP Address**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Confirm

5. **Get Connection String**
   - Go to "Clusters" → Click "Connect"
   - Select "Drivers" → "Node.js"
   - Copy connection string (looks like):
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cstr
   ```

6. **Update `.env`**
   - Open `backend/.env`
   - Replace `MONGODB_URI` with your connection string:
   ```
   MONGODB_URI=mongodb+srv://cstr_user:your_password@cluster0.xxxxx.mongodb.net/cstr
   ```

7. **Restart Backend**
   - Press `Ctrl+C` in backend terminal
   - Run `npm run dev`
   - You should see: `✓ MongoDB connected successfully`

8. **Run Seed Script**
   ```bash
   npm run seed:members
   ```

---

## ✅ Option 2: Local MongoDB

**Best for:** Offline development

### Windows:

1. **Download**
   - Go to https://www.mongodb.com/try/download/community
   - Download Windows installer
   - Run installer
   - Choose "Install MongoDB as a Service"

2. **Start MongoDB**
   ```bash
   # MongoDB should start automatically as a service
   # Or manually start:
   mongod
   ```

3. **Verify Connection**
   - You should see `listening on 127.0.0.1:27017`

4. **Run Seed Script**
   ```bash
   cd backend
   npm run seed:members
   ```

### Mac:

```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Or manually
mongod
```

### Linux:

```bash
# Ubuntu/Debian
sudo apt-get install -y mongodb
sudo systemctl start mongodb

# Or manually
mongod
```

---

## 🧪 Test Connection

After setting up MongoDB and updating `.env`:

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Run seed (after seeing "✓ MongoDB connected successfully")
npm run seed:members
```

You should see:
```
✓ Connected to MongoDB
✓ Cleared existing members
✓ Successfully added 6 members
```

---

## 📋 Members to be Added

- Dr. Chinta Sankar Rao (Faculty Advisor)
- Energy HPD (Faculty Advisor)
- Regupathi Iyyaswami (Head of Department)
- Nishant Patil (Convenor)
- Rashmi K Murthy (Joint Convenor)
- Ashish Manash (Website Head)

---

## 🔍 Verify in Website

After seeding:

1. Visit `http://localhost:3000/members`
2. You should see all 6 team members displayed
3. Click LinkedIn links to verify they work

---

## ❓ Troubleshooting

### Connection Still Fails
- Check if `MONGODB_URI` is correct in `backend/.env`
- Ensure no typos in password
- For MongoDB Atlas: Check IP is whitelisted in Network Access
- Restart backend: `npm run dev`

### Port 27017 Already in Use
```bash
# Find process using port
lsof -i :27017  # Mac/Linux
Get-Process -Id (Get-NetTCPConnection -LocalPort 27017).OwningProcess  # Windows

# Kill process or use different port in .env
MONGODB_URI=mongodb://localhost:27018/cstr
```

### Can't Find Connection String
- Log into MongoDB Atlas
- Click "Clusters"
- Click "Connect"
- Select "Drivers"
- Copy the connection string

---

## ✅ Next Steps

After adding members to database:

1. Visit `/members` page to see team displayed
2. Add About, Contact, Events pages
3. Create event management features
4. Setup image uploads for profile pictures

---

**Let me know which option you choose!** 👍
