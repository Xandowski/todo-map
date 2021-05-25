import connect from '../../../utils/database'
import SessionsSchema from '../../../models/sessions'
import GoalsSchema from '../../../models/goals'
// import GoalsLogSchema from '../../../models/goalsLog'
import Cookies from 'cookies'

export default async (request, response) => {
  if (request.method === 'POST') {

    const { name,
            type, // 1 = daily | 2 = weekly | 3 = monthly
          } = request.body

    if (!name) {
      response.status(400).json({ message: 'Missing name' })
      return
    } 
    
    if (!type){
      response.status(400).json({ message: 'Missing type' })
      return
    } 

    if (type < 1 || type > 3 ){
      response.status(400).json({ message: 'Invalid type' })
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
    
    const dbResponse = GoalsSchema.create({
      name,
      owner:session.userId,
      type,
      createdAt: new Date()
    })

    response.status(200).json((await dbResponse))
    return

  } else {
    response.status(400).json({ message: 'Wrong method' })
    return

  }
  
}