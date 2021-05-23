import connect from '../../../utils/database'
import Cookies from 'cookies'

export default async (request, response) => {
  if (request.method === 'POST') {
    const { 
      parentId,
    } = request.body

    if (!parentId) {
      response.status(400).json({ message: 'Missing parent id' })
      return
    } 

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

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const findDuplicate = await db.collection('goalsLog').findOne({ parentId: parentId, createdAt: {$gte: today} })

    if (findDuplicate){
      response.status(200).json({ message: 'Already done' })
      return
    }
    
    const dbResponse = db.collection('goalsLog').insertOne({
      parentId,
      owner:session.userId,
      createdAt: new Date()
    })

    response.status(200).json((await dbResponse).ops[0])
    return

  } else {
    response.status(400).json({ message: 'Wrong method' })
    return

  }
  
}