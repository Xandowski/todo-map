import mongoose from 'mongoose'

const GoalsLogSchema = new mongoose.Schema({
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Parent missing"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Owner missing"],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.goalsLog || mongoose.model('goalsLog', GoalsLogSchema);