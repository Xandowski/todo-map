import connect from '../../../utils/database'
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
    
    const dbResponse = db.collection('goals').insertOne({
      name,
      owner:session.userId,
      type,
      createdAt: new Date()
    })

    response.status(200).json((await dbResponse).ops[0])
    return

  } else {
    response.status(400).json({ message: 'Wrong method' })
    return

  }
  
}