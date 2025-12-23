# How to Add Member Profile Pictures

## Step 1: Get Photo URLs

For each member, you need a photo URL. Here are the ways to get them:

### **Option A: From LinkedIn Profile**
1. Go to member's LinkedIn profile
2. Right-click on their profile photo
3. Select "Copy image link" or "Copy image address"
4. You'll get a URL like: `https://media.licdn.com/dms/image/...`

### **Option B: Upload to Free Image Hosting**
- **Imgur**: https://imgur.com (upload, get shareable link)
- **Cloudinary**: https://cloudinary.com (free tier)
- **Imgbb**: https://imgbb.com (simple, no signup needed)

### **Option C: Use Google Drive**
1. Upload photo to Google Drive
2. Right-click → Share → Change to "Anyone with the link"
3. Get the file ID from URL
4. Use: `https://drive.google.com/uc?export=view&id=FILE_ID`

---

## Step 2: Collect URLs for Each Member

Get URLs for these 6 members:
1. **Dr. Chinta Sankar Rao** - URL: _____________
2. **Dr. Hari Prasad Dasari** - URL: _____________
3. **Regupathi Iyyaswami** - URL: _____________
4. **Nishant Patil** - URL: _____________
5. **Rashmi K Murthy** - URL: _____________
6. **Ashish Manash** - URL: _____________

---

## Step 3: Update the Seed File

Once you have the URLs, I will update the file:
`/backend/src/seed-members.ts`

Replace the `profileImage` URLs with your actual image links.

---

## Step 4: Re-seed the Database

Run this command:
```bash
cd backend
npm run seed:members
```

Or:
```bash
cd backend
npx tsx src/seed-members.ts
```

---

## Quick Example

```typescript
{
  name: 'Dr. Chinta Sankar Rao',
  role: 'Faculty Advisor',
  category: 'leadership',
  linkedIn: 'https://www.linkedin.com/in/dr-chinta-sankar-rao-1539b83a/',
  profileImage: 'https://media.licdn.com/dms/image/C5603AQExxxxxx/profile-displayphoto-shrink_400_400/0/1234567890?e=1234567890&v=beta&t=xxxxx',
  department: 'Chemical Engineering',
  bio: 'Faculty Advisor - Leading research and innovation in Chemical Engineering',
}
```

---

## What to Do:

1. Gather image URLs for all 6 members
2. Send them to me (paste the URLs)
3. I'll update the database and re-seed it
4. Members will display with their actual photos! 📸

**Ready? Send me the image URLs!** 🎉
