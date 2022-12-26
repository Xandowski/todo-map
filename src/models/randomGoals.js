import mongoose from 'mongoose'

const RandomGoalsSchema = new mongoose.Schema({
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

export default mongoose.models.randomGoals || mongoose.model('randomGoals', RandomGoalsSchema);