import connect from '../../../utils/database'
import SessionsSchema from '../../../models/sessions'
import RandomGoalsSchema from '../../../models/randomGoals'
import GoalsSchema from '../../../models/goals'
import GoalsLogSchema from '../../../models/goalsLog'
import { ObjectID } from 'mongodb'
import Cookies from 'cookies'

export default async (request, response) => {
  if (request.method === 'GET') {

    const cookies = new Cookies(request, response)
    const sessionToken = cookies.get(process.env.NEXTAUTH_URL == 'http://localhost:3000' ? 'next-auth.session-token' : '__Secure-next-auth.session-token')

    if (!sessionToken) {
      response.status(400).json({ message: 'No permission' })
      return
    }

    await connect()
    const session = await SessionsSchema.findOne({ sessionToken: sessionToken })

    if (!session) {
      response.status(400).json({ message: 'No permission' })
      return
    }

    const lastTwoHour = new Date();
    lastTwoHour.setHours(lastTwoHour.getHours() - 2);
    const randomGoalAlreadySet = await RandomGoalsSchema.findOne({
      owner: session.userId,
      createdAt: { $gte: lastTwoHour }
    });

    if (randomGoalAlreadySet) {
      const alreadySet = {
        "message": 'Already set',
        "parent": randomGoalAlreadySet
      }
      response.status(400).json(alreadySet)
      return
    }
    
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const alreadyDoneGoals = await GoalsLogSchema.find({
      owner: session.userId,
      createdAt: { $gte: today }
    })

    const userGoals = await GoalsSchema.find({ owner: session.userId })
    const validGoals = userGoals.filter(goal => !alreadyDoneGoals.includes(goal))
    const randomGoal = validGoals[Math.floor(Math.random()*validGoals.length)];

    const definedRandomGoal = await RandomGoalsSchema.create({
      owner: session.userId,
      parentId:new ObjectID(randomGoal._id),
      createdAt: new Date()
    })
    
    if (definedRandomGoal) {
      const goal = await GoalsSchema.findOne({
        owner: session.userId,
        _id: definedRandomGoal.parentId
      })

      response.status(200).json(goal)
      return
    }

    response.status(500).json({message:'Random goal can not be defined'})
    return

  } else {
    response.status(400).json({ message: 'Wrong method' })
    return

  }

}