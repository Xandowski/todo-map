import mongoose from 'mongoose'

const GoalsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this goal.'],
    maxlength: [100, 'Name cannot be more than 60 characters'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Owner missing"],
  },
  type: {
    type: Number
  },
  inProgress:{
    type: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.goals || mongoose.model('goals', GoalsSchema);