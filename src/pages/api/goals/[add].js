import connect from '../../../utils/database'
export default async (request, response) => {
  if (request.method === 'POST') {
    const { name,
            type, // 1 = daily | 2 = weekly | 3 = monthly
            owner
          } = request.body

    if (!name) {
      response.status(400).json({ message: 'Missing name' })
      return
    } 
    
    if (!type){
      response.status(400).json({ message: 'Missing type' })
      return
    } 

    if (!owner){
      response.status(400).json({ message: 'Missing owner' })
      return
    }

    if (type < 1 || type > 3 ){
      response.status(400).json({ message: 'Invalid type' })
      return
    }

    const { db } = await connect()
    const dbResponse = db.collection('goals').insertOne({
      name,
      owner,
      type,
      createdAt: new Date()
    })

    response.status(200).json((await dbResponse).ops[0])
    
  } else {
    response.status(400).json({ message: 'Wrong method' })
  }
}