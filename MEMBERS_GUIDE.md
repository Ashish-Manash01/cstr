# Adding Members to CSTR

## Quick Setup

### Step 1: Seed Initial Members
Run this command in the backend directory to add your members to the database:

```bash
cd backend
npm run seed
```

This will add:
- **Leadership**: Dr. Chinta Sankar Rao, Energy HPD, Regupathi Iyyaswami
- **Admin Core**: Nishant Patil, Rashmi K Murthy, Ashish Manash

### Step 2: View Members Page
Visit: `http://localhost:3000/members`

You should see all members grouped by category with LinkedIn links.

---

## Managing Members

### Add/Edit Members via Admin Panel
1. Login at `http://localhost:3000/auth/login`
2. Go to `http://localhost:3000/admin/members`
3. Click "Add Member" to add new members

### Member Form Fields
- **Name**: Member's full name
- **Role**: Position in club (e.g., "President", "Secretary")
- **Category**: Team category
  - `leadership` - Faculty advisors, HOD
  - `admin` - Convenor, coordinators
  - `technical` - Technical team
  - `events` - Events organizers
  - `general` - Regular members
- **Department**: (optional) Department name
- **LinkedIn URL**: Direct link to LinkedIn profile
- **Profile Image URL**: (optional) Direct link to profile photo
- **Bio**: (optional) Short bio

---

## Adding Profile Images

### Option 1: Use LinkedIn Profile Photo URL
1. Open member's LinkedIn profile
2. Right-click profile photo → Copy image link
3. Paste in "Profile Image URL" field

### Option 2: Host Images Externally
- Upload to Cloudinary, Imgur, or similar
- Get direct image URL
- Paste in form

### Option 3: Store Locally (Advanced)
- Add image to `/public/team/` folder
- Use path: `/team/member-name.jpg`

---

## Member Data Format

Each member has:
```typescript
{
  _id: string              // Auto-generated
  name: string             // Full name
  role: string             // Position/title
  category: string         // Category type
  linkedIn: string         // LinkedIn URL
  profileImage?: string    // Photo URL (optional)
  bio?: string             // Short description (optional)
  department?: string      // Department name (optional)
  createdAt: Date          // Auto-generated
  updatedAt: Date          // Auto-generated
}
```

---

## Editing Members

1. Go to Admin Panel: `/admin/members`
2. Click "Edit" on any member
3. Modify details
4. Click "Update Member"

---

## Deleting Members

1. Go to Admin Panel: `/admin/members`
2. Click "Delete" on any member
3. Confirm deletion

---

## Categories Explained

| Category | Use For | Color |
|----------|---------|-------|
| Leadership | Faculty advisors, HOD | Blue |
| Admin | Convenors, coordinators | Blue |
| Technical | Technical team members | Blue |
| Events | Event organizers | Blue |
| General | Regular members | Blue |

---

## API Endpoints

### Get all members
```
GET /api/members
GET /api/members?category=leadership
```

### Get specific member
```
GET /api/members/:id
```

### Create member (auth required)
```
POST /api/members
Body: { name, role, category, linkedIn, profileImage?, bio?, department? }
```

### Update member (auth required)
```
PUT /api/members/:id
Body: { name, role, category, linkedIn, profileImage?, bio?, department? }
```

### Delete member (auth required)
```
DELETE /api/members/:id
```

---

## Troubleshooting

**Members not showing after seed?**
- Check MongoDB is running
- Check MONGODB_URI in backend/.env
- Restart backend server

**Images not loading?**
- Use full HTTP/HTTPS URLs
- Check image URL is publicly accessible
- Some LinkedIn URLs may not work

**Can't access admin panel?**
- Must be logged in first
- Try `/auth/login` first
- Check token in localStorage

---

For more help, see DEVELOPMENT.md or README.md
