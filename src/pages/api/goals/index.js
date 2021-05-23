import connect from '../../../utils/database'
import Cookies from 'cookies'

export default async (request, response) => {
  if (request.method === 'GET') {

    const cookies = new Cookies(request, response)
    const sessionToken = cookies.get('next-auth.session-token')

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

    db.collection('goals').find({ owner: session.userId }).toArray(function (err, docs) { 
      if (err) {
        response.status(500).send({error: err})
        return
      }
      if (!docs) {
        response.status(400).json({ error: 'No goal was found' })
        return
      }
      response.send(docs)
      return
    });

  } else if (request.method === 'POST') {
    response.status(400).json({ message: 'Wrong method' })
  }

}
