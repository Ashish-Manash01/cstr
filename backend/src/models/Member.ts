import mongoose, { Schema, Document } from 'mongoose'

export interface IMember extends Document {
  name: string
  role: string
  category: 'leadership' | 'admin' | 'technical' | 'events' | 'general'
  department?: string
  linkedIn: string
  profileImage?: string
  bio?: string
  createdAt: Date
  updatedAt: Date
}

const memberSchema = new Schema<IMember>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['leadership', 'admin', 'technical', 'events', 'general'],
      default: 'general',
    },
    department: String,
    linkedIn: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: String,
    bio: String,
  },
  { timestamps: true }
)

export default mongoose.model<IMember>('Member', memberSchema)
