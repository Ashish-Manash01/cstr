import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Member from './models/Member'

dotenv.config()

const members = [
  // Leadership
  {
    name: 'Dr. Chinta Sankar Rao',
    role: 'Faculty Advisor',
    category: 'leadership',
    linkedIn: 'https://www.linkedin.com/in/dr-chinta-sankar-rao-1539b83a/',
    department: 'Chemical Engineering',
  },
  {
    name: 'Energy HPD',
    role: 'Faculty Advisor',
    category: 'leadership',
    linkedIn: 'https://www.linkedin.com/in/energy-hpd/',
    department: 'Chemical Engineering',
  },
  {
    name: 'Regupathi Iyyaswami',
    role: 'Head of Department',
    category: 'leadership',
    linkedIn: 'https://www.linkedin.com/in/regupathi-iyyaswami-9b3a7a65/',
    department: 'Chemical Engineering',
  },

  // Admin Core
  {
    name: 'Nishant Patil',
    role: 'Convenor',
    category: 'admin',
    linkedIn: 'https://www.linkedin.com/in/nishant2004patil/',
    department: 'Chemical Engineering',
  },
  {
    name: 'Rashmi K Murthy',
    role: 'Joint Convenor',
    category: 'admin',
    linkedIn: 'https://www.linkedin.com/in/rashmi-k-murthy/',
    department: 'Chemical Engineering',
  },
  {
    name: 'Ashish Manash',
    role: 'Website Head',
    category: 'admin',
    linkedIn: 'https://www.linkedin.com/in/ashish-manash-abb155342/',
    department: 'Chemical Engineering',
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
    await Member.insertMany(members)
    console.log(`✓ Added ${members.length} members`)

    console.log('\n✅ Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('✗ Seeding failed:', error)
    process.exit(1)
  }
}

seedMembers()
