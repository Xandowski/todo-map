import connect from '../../utils/database'

export default async (request, response) => {
  // if (request.method === 'POST') {
  // const { name } = request.body

  // if (!name) {
  //   response.status(400).json({ message: 'Missing name' })
  //   return
  // }

  // }
  const { db } = await connect()

  const dbResponse = db.collection('users').insertOne({
    name: 'Alexandre'
  })

  response.status(200).json(dbResponse.ops[0])
}
