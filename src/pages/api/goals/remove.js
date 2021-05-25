import connect from '../../../utils/database'
import Cookies from 'cookies'
import { ObjectID } from 'mongodb'

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
    
    const dbResponse = await db.collection('goals').deleteOne({
      _id:ObjectID(parentId),
      owner:session.userId,
    })

    if (!dbResponse){
      response.status(400).json({ message: 'Fail to delete: Goal was not found' })
      return
    }

    response.status(200).json({deleteCount: dbResponse.deletedCount})
    return

  } else {
    response.status(400).json({ message: 'Wrong method' })
    return

  }
  
}