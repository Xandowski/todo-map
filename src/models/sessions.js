import mongoose from 'mongoose'

const SessionsSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Parent missing"],
    },
    expires:{
      type: Date,
      required: [true, "Expire date missing"],
    },
    sessionToken:{
      type:String,
      required: [true, "Session token missing"],
    },
    accessToken:{
      type:String,
      required: [true, "Access token missing"],
    },
    createdAt: {
      type: Date,
      required: [true, "Created date missing"],
    },
    updatedAt: {
      type: Date,
      required: [true, "Updated date missing"],
    }
  })
  
export default mongoose.models.sessions || mongoose.model('sessions', SessionsSchema);