import mongoose, { Schema, Document } from 'mongoose'

export interface IMessage extends Document {
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
  updatedAt: Date
}

const messageSchema = new Schema<IMessage>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model<IMessage>('Message', messageSchema)
