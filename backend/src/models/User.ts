import mongoose, { Schema, Document } from 'mongoose'
import bcryptjs from 'bcryptjs'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: 'student' | 'mentor' | 'admin'
  department?: string
  year?: number
  photo?: string
  bio?: string
  socialLinks?: {
    linkedin?: string
    github?: string
  }
  eventsAttended: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
  comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['student', 'mentor', 'admin'],
      default: 'student',
    },
    department: String,
    year: {
      type: Number,
      min: 1,
      max: 4,
    },
    photo: String,
    bio: String,
    socialLinks: {
      linkedin: String,
      github: String,
    },
    eventsAttended: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
  },
  { timestamps: true }
)

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  try {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

// Method to compare passwords
userSchema.methods.comparePassword = async function (password: string) {
  return await bcryptjs.compare(password, this.password)
}

export default mongoose.model<IUser>('User', userSchema)
