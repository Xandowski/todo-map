import connect from '../../../utils/database'

export default async (request, response) => {
  if (request.method === 'POST') {
    const { name } = request.body

    if (!name) {
      response.status(400).json({ message: 'Missing name' })
      return
    }

    await connect()

    const dbResponse = db.collection('users').create({
      name
    })

    response.status(200).json((await dbResponse))
  } else if (request.method === 'GET') {
    const { user } = request.query
    const { name } = request.body

    // if (!name) {
    //   response.status(400).json({ error: 'Missing name on request body' })
    //   return
    // }
    await connect()

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
