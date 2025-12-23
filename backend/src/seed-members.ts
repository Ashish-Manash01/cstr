import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Member from './models/Member'
import crypto from 'crypto'

dotenv.config()

// Function to generate Gravatar URL
const getGravatarUrl = (email: string): string => {
  const hash = crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex')
  return `https://www.gravatar.com/avatar/${hash}?s=400&d=identicon`
}

const MEMBERS_DATA = [
  // Faculty
  {
    name: 'Dr. Chinta Sankar Rao',
    role: 'Faculty Advisor',
    category: 'leadership',
    linkedIn: 'https://www.linkedin.com/in/dr-chinta-sankar-rao-1539b83a/',
    profileImage: 'https://media.licdn.com/dms/image/v2/C5603AQGvCwPjJs8I3w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1516857562490?e=1767225600&v=beta&t=ewoRxmN_wC8XCzarT4ahxrNn0c--YBp5ipvCjiBy7gI',
    department: 'Chemical Engineering',
    bio: 'Faculty Advisor - Leading research and innovation in Chemical Engineering',
  },
  {
    name: 'Keyur Raval',
    role: 'Head of Department',
    category: 'leadership',
    linkedIn: 'https://www.linkedin.com/in/keyur-raval-641308/',
    profileImage: 'https://media.licdn.com/dms/image/v2/D5603AQFjkTw3jiatxg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1698932934471?e=1767225600&v=beta&t=VG0WliGUATPKTpfHJ_Aav5h27w2oNx14SXRiJU5vulw',
    department: 'Chemical Engineering',
    bio: 'Head of Department - Overseeing academic excellence and student development',
  },
  {
    name: 'Dr. Hari Prasad Dasari',
    role: 'Faculty Advisor',
    category: 'leadership',
    linkedIn: 'https://www.linkedin.com/in/energy-hpd/',
    profileImage: 'https://media.licdn.com/dms/image/v2/D4E03AQGi1mbh97F1qQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1701170276057?e=1767225600&v=beta&t=J6urlhe_vA_sTZnrYqW6GGQNZbBJH1r0ORcspclNW8M',
    department: 'Chemical Engineering',
    bio: 'Faculty Advisor - Mentoring and guiding CSTR initiatives',
  },
  // Admin Core
  {
    name: 'Nishant Patil',
    role: 'Convenor',
    category: 'admin',
    linkedIn: 'https://www.linkedin.com/in/nishant2004patil/',
    profileImage: 'https://media.licdn.com/dms/image/v2/D5603AQHC3hTRaXcVBQ/profile-displayphoto-shrink_800_800/B56ZTgKiuCHQAc-/0/1738927651809?e=1767225600&v=beta&t=arMVz3X6O2wnwvFfLDmR7KyFwZn-k8E84n_37k6VXOI',
    department: 'Chemical Engineering',
    bio: 'A. CONVENOR - Leading CSTR with vision and dedication',
  },
  {
    name: 'Rashmi K Murthy',
    role: 'Co-Convenor',
    category: 'admin',
    linkedIn: 'https://www.linkedin.com/in/rashmi-k-murthy/',
    profileImage: 'https://media.licdn.com/dms/image/v2/D5603AQHc4CayO1ASug/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1696416808251?e=1767225600&v=beta&t=tiXWgCbHkvdQdO6x3AoUeyLe5k_Urj6mu1MLuCXLuSU',
    department: 'Chemical Engineering',
    bio: 'B. CO-CONVENOR - Organizing events and managing club operations',
  },
  {
    name: 'Sushanth Reddy',
    role: 'Executive Head',
    category: 'admin',
    linkedIn: 'https://www.linkedin.com/in/sushanth-reddy-066b91304/',
    profileImage: 'https://media.licdn.com/dms/image/v2/D4E03AQGwVxN8rIXVbw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1713598509136?e=1767225600&v=beta&t=EYR2zWssbu8W-TbBvqZkl9gnIwrGagxHvqwlflO5dCo',
    department: 'Chemical Engineering',
    bio: 'C. EXECUTIVE HEAD - Managing operations and strategic initiatives',
  },
  {
    name: 'G Aadhithya',
    role: 'Co-Executive Head',
    category: 'admin',
    linkedIn: 'https://www.linkedin.com/in/g-aadhithya-6424bb250/',
    profileImage: 'https://media.licdn.com/dms/image/v2/D5603AQGTvn5IRUybtA/profile-displayphoto-crop_800_800/B56ZrGwKWQHAAI-/0/1764271107172?e=1767225600&v=beta&t=ujK_bHLpGZLf_kmafeGgjp5YdapaoyBy2t8-kABooWE',
    department: 'Chemical Engineering',
    bio: 'D. CO-EXECUTIVE HEAD - Supporting operations and coordination',
  },
  // Technical Team
  {
    name: 'Praneeth Gadepu',
    role: 'Technical Team Lead',
    category: 'technical',
    linkedIn: 'https://www.linkedin.com/in/praneeth-gadepu-9878b831a/',
    profileImage: 'https://media.licdn.com/dms/image/v2/D4E03AQE__Dp7OkOAvw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1721571394168?e=1767225600&v=beta&t=Qw7mMTptElFM6YXBYXx4yzOsB4FZXPGXHP7deR9YKqg',
    department: 'Chemical Engineering',
    bio: 'A. TECHNICAL TEAM LEAD - Praneeth Gadepu',
  },
  {
    name: 'Hema Swaroop',
    role: 'Website Head',
    category: 'technical',
    linkedIn: 'https://www.linkedin.com/in/hema-swaroop-079842287/',
    profileImage: 'https://media.licdn.com/dms/image/v2/D5603AQFyxUtC789tJA/profile-displayphoto-crop_800_800/B56Zgle2rJHMAI-/0/1752975503860?e=1767225600&v=beta&t=YrzE42v6bZYJmbU_4K2PN_aCRAz9vRsH_knl0BOUYv4',
    department: 'Chemical Engineering',
    bio: 'B. WEBSITE HEAD - Hema Swaroop',
  },
  {
    name: 'Ashish Manash',
    role: 'Backend Head',
    category: 'technical',
    linkedIn: 'https://www.linkedin.com/in/ashish-manash-abb155342/',
    profileImage: 'https://media.licdn.com/dms/image/v2/D4E03AQHk3S9hw-vtrA/profile-displayphoto-crop_800_800/B4EZg995gLGwAI-/0/1753386294727?e=1767225600&v=beta&t=De7iL43FVPakeZB79Jvf-0Zrt7-54MbG-q1my0qZcqk',
    department: 'Chemical Engineering',
    bio: 'C. BACKEND HEAD - Ashish Manash',
  },
]

const seedMembers = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cstr'
    await mongoose.connect(mongoUri)
    console.log('✓ Connected to MongoDB')

    // Clear existing members
    await Member.deleteMany({})
    console.log('✓ Cleared existing members')

    // Insert new members
    await Member.insertMany(MEMBERS_DATA)
    console.log(`✓ Successfully added ${MEMBERS_DATA.length} members`)

    await mongoose.disconnect()
    console.log('✓ Disconnected from MongoDB')
  } catch (error) {
    console.error('✗ Error seeding members:', error)
    process.exit(1)
  }
}

seedMembers()
