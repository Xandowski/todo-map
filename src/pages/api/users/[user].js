import connect from '../../../utils/database'

export default async (request, response) => {
  if (request.method === 'POST') {
    const { name } = request.body

    if (!name) {
      response.status(400).json({ message: 'Missing name' })
      return
    }

    const { db } = await connect()

    const dbResponse = db.collection('users').insertOne({
      name,
      level: 1,
      currentExperience: 0,
      challengesCompleted: 0,
    })

    response.status(200).json((await dbResponse).ops[0])
  } else if (request.method === 'GET') {
    const { user } = request.query
    const { name } = request.body

    // if (!name) {
    //   response.status(400).json({ error: 'Missing name on request body' })
    //   return
    // }
    const { db } = await connect()

    const dbResponse = await db.collection('users').findOne({ name: user })

    if (!dbResponse) {
      response.status(400).json({ error: 'User not found' })
      return
    }

    response.status(200).json(dbResponse)
  } else {
    response.status(400).json({ message: 'metodo errado' })
  }
}
