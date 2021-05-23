import connect from '../../../utils/database'

export default async (request, response) => {
  if (request.method === 'POST') {
    const { name,
            owner
          } = request.body

    if (!name) {
      response.status(400).json({ message: 'Missing daily goal name' })
      return
    } else if (!owner){
      response.status(400).json({ message: 'Missing owner' })
      return
    }

    const { db } = await connect()
    const dbResponse = db.collection('goals').insertOne({
      name,
      owner,
      createdAt: new Date()
    })

    response.status(200).json((await dbResponse).ops[0])
    
  } else {
    response.status(400).json({ message: 'Wrong method' })
  }
}