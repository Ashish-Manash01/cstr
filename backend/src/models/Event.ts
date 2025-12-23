import mongoose, { Schema, Document } from 'mongoose'

export interface IEvent extends Document {
  title: string
  description: string
  date: Date
  time: string
  location: string
  category: string
  image?: string
  attendees: mongoose.Types.ObjectId[]
  maxCapacity?: number
  createdAt: Date
  updatedAt: Date
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['seminar', 'workshop', 'networking', 'conference', 'other'],
      default: 'other',
    },
    image: String,
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    maxCapacity: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
)

export default mongoose.model<IEvent>('Event', eventSchema)
