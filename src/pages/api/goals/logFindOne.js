import connect from '../../../utils/database'
import SessionsSchema from '../../../models/sessions'
// import GoalsSchema from '../../../models/goals'
import GoalsLogSchema from '../../../models/goalsLog'
import Cookies from 'cookies'

export default async (request, response) => {
  if (request.method === 'GET') {

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

    var searchParams = {
      owner: session.userId,
      parentId: request.query.id,
      createdAt: 
      {
        $gte: new Date((new Date().getTime() - (1 * 365 * 24 * 60 * 60 * 1000)))
      }
    }

    const dbResponse = await GoalsLogSchema.find(searchParams);
    response.status(200).json(dbResponse)
    return

  } else {
    response.status(400).json({ message: 'Wrong method' })
    return

  }
  
}