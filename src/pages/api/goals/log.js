import connect from '../../../utils/database'
import Cookies from 'cookies'

export default async (request, response) => {
  if (request.method === 'GET') {

    const cookies = new Cookies(request, response)
    const sessionToken = cookies.get(process.env.NEXTAUTH_URL == 'http://localhost:3000' ? 'next-auth.session-token' : '__Secure-next-auth.session-token')

    if (!sessionToken){
      response.status(400).json({ message: 'No permission' })
      return
    }

    const { db } = await connect()
    const session = await db.collection('sessions').findOne({ sessionToken: sessionToken })

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

    db.collection('goalsLog').find(searchParams).toArray(function (err, docs) { 
      if (err) {
        response.status(500).send({error: err})
        return
      }
      if (!docs) {
        response.status(400).json({ error: 'No goals log was found' })
        return
      }
      response.send(docs)
      return
    });

  } else {
    response.status(400).json({ message: 'Wrong method' })
    return

  }
  
}