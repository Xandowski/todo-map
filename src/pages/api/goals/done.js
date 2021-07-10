import connect from '../../../utils/database'
import SessionsSchema from '../../../models/sessions'
// import GoalsSchema from '../../../models/goals'
import GoalsLogSchema from '../../../models/goalsLog'
import Cookies from 'cookies'

export default async (request, response) => {
  if (request.method === 'POST') {
    const { 
      parentId,
      clientTimestamp
    } = request.body

    if (!parentId) {
      response.status(400).json({ message: 'Missing parent id' })
      return
    } 

    const cookies = new Cookies(request, response)
    const sessionToken = cookies.get(process.env.NEXTAUTH_URL == 'http://localhost:3000' ? 'next-auth.session-token' : '__Secure-next-auth.session-token')

    if (!sessionToken){
      response.status(400).json({ message: 'No permission' })
      return
    }

    await connect()
    const session = await SessionsSchema.findOne({ sessionToken: sessionToken })

    if (!session){
      response.status(400).json({ message: 'No permission' })
      return
    }

    const timeFix = new Date().getTime() - clientTimestamp
    const now = new Date(new Date() - timeFix)
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const findDuplicate = await GoalsLogSchema.findOne({ parentId: parentId, createdAt: {$gte: today} })

    if (findDuplicate){
      response.status(200).json({
        message: 'Already done',
        timeFix : timeFix,
        now : now,
        today : today
      })
      return
    }
    
    const dbResponse = await GoalsLogSchema.create({
      parentId,
      owner:session.userId,
      createdAt: new Date()
    })

    response.status(200).json(dbResponse)
    return

  } else {
    response.status(400).json({ message: 'Wrong method' })
    return

  }
  
}