import connect from '../../../utils/database'
import SessionsSchema from '../../../models/sessions'
// import GoalsSchema from '../../../models/goals'
import GoalsLogSchema from '../../../models/goalsLog'
import Cookies from 'cookies'
import { ObjectID } from 'mongodb'

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
      createdAt: 
      {
        $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))
      }
    }

    const dbResponse = await GoalsLogSchema.find(searchParams);
    response.status(200).json(dbResponse)
    return

    // GoalsLogSchema.find(searchParams).toArray(function (err, docs) { 
    //   if (err) {
    //     response.status(500).send({error: err})
    //     return
    //   }
    //   if (!docs) {
    //     response.status(400).json({ error: 'No goals log was found' })
    //     return
    //   }
    //   response.send(docs)
    //   return
    // });

  } else {
    response.status(400).json({ message: 'Wrong method' })
    return

  }
  
}