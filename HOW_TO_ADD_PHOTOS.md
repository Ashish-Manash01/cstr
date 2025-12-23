# How to Add Member Photos ✨

You now have an easy way to add photos to all team members! Here's how:

## Method 1: Using the Photo Upload Tool (Easiest) ⚡

### Step 1: Go to the Upload Page
- Visit: **http://localhost:3000/admin/upload-photos**
- Or click the **📸 Upload** button in the navbar

### Step 2: Load Members
- Click "**Load Members**" button
- All 6 team members will appear in the dropdown

### Step 3: Select a Member
- Choose a member from the dropdown
- Example: "Dr. Chinta Sankar Rao"

### Step 4: Add Image URL
You can get image URLs from:

**Option A: LinkedIn Profile Photos**
1. Go to the member's LinkedIn profile
2. Right-click their profile photo
3. Select "Copy image link"
4. Paste into the Image URL field

**Option B: Free Image Services**
- **Imgur.com** - Upload → Copy link
- **Cloudinary.com** - Free account with 25 GB storage
- **Unsplash.com** - Free stock photos
- **Pexels.com** - Free stock photos

**Option C: Use Existing URLs**
```
https://media.licdn.com/dms/image/...
https://imgur.com/...
https://images.unsplash.com/...
```

### Step 5: Preview & Update
- See a preview of the image
- Click "✅ **Update Photo**"
- Photo is saved to database!

---

## Method 2: Direct Database Entry (Advanced)

Edit `backend/src/seed-members.ts`:

```typescript
{
  name: 'Dr. Chinta Sankar Rao',
  role: 'Faculty Advisor',
  category: 'leadership',
  linkedIn: 'https://www.linkedin.com/in/...',
  profileImage: 'https://media.licdn.com/dms/image/...', // ← Add URL here
  department: 'Chemical Engineering',
  bio: 'Faculty Advisor...',
}
```

Then run: `npm run seed:members`

---

## Recommended Free Image Sources

### LinkedIn Photos (Recommended) ✅
- **Pros:** Official headshots, professional
- **Cons:** May need extraction
- **How:** Right-click profile photo → Copy image link

### Cloudinary (Recommended) ✅
- **Pros:** Free 25GB, fast, reliable
- **Link:** https://cloudinary.com
- **Steps:** Sign up → Upload → Copy URL

### Imgur
- **Pros:** Simple, no login needed
- **Link:** https://imgur.com

### Unsplash / Pexels
- **Pros:** Free stock photos
- **Good for:** Fallback images

---

## Troubleshooting

### Image doesn't show
- ❌ Image URL is broken or expired
- ✅ Try a different URL
- ✅ Use Cloudinary for permanent storage

### Can't find image URL
- ✅ Right-click image → "Copy image link"
- ✅ Use browser DevTools (F12) → Network tab → find image request
- ✅ Use Cloudinary to upload and get permanent URL

### Photo uploaded but not showing
- Wait 5-10 seconds for cache refresh
- Hard refresh page: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
- Check browser console for errors

---

## Example URLs (You can use these)

Professional Headshots:
```
https://media.licdn.com/dms/image/v2/D5635AQHx_-h5y8Yy6A/profile-framedphoto-shrink_800_800/0/1234567890?e=1700000000&v=beta&t=profile
```

Generic Avatars:
```
https://api.dicebear.com/7.x/avataaars/svg?seed=NishantPatil&backgroundColor=random
```

---

## Current Team Members Waiting for Photos

1. ✍️ Dr. Chinta Sankar Rao - Faculty Advisor
2. ✍️ Dr. Hari Prasad Dasari - Faculty Advisor  
3. ✍️ Regupathi Iyyaswami - Head of Department
4. ✍️ Nishant Patil - Convenor
5. ✍️ Rashmi K Murthy - Joint Convenor
6. ✍️ Ashish Manash - Website Head

---

## Quick Links

- **Upload Photos:** http://localhost:3000/admin/upload-photos
- **View Members:** http://localhost:3000/members
- **Cloudinary:** https://cloudinary.com/users/register/free
- **Imgur:** https://imgur.com

---

**That's it!** Your CSTR website is almost complete! 🎉
