import connect from '../../../utils/database'
import SessionsSchema from '../../../models/sessions'
// import GoalsSchema from '../../../models/goals'
import GoalsLogSchema from '../../../models/goalsLog'
import Cookies from 'cookies'

export default async (request, response) => {
  if (request.method === 'POST') {
    const { 
      parentId,
      offset
    } = request.body

    if (!parentId) {
      response.status(400).json({ message: 'Missing parent id' })
      return
    } 

    if (offset < -12 || offset > 14 ){
      response.status(400).json({ message: 'Invalid timezone' })
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

    const now = new Date()
    now.setHours(now.getHours() + offset)
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const findDuplicate = await GoalsLogSchema.findOne({ parentId: parentId, createdAt: {$gte: today} })

    if (findDuplicate){
      const alreadyDone = {
        "message" : 'Already done',
        "parent" : findDuplicate
      }
      response.status(400).json(alreadyDone)
      return
    }
    
    const dbResponse = await GoalsLogSchema.create({
      parentId,
      owner:session.userId,
      createdAt: now
    })

    response.status(200).json(dbResponse)
    return

  } else {
    response.status(400).json({ message: 'Wrong method' })
    return

  }
  
}
