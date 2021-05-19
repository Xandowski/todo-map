import connect from '../../../utils/database'

export default async (request, response) => {
  if (request.method === 'GET') {
    const { owner } = request.body // TO DO: Get user id (owner) by session
    const { db } = await connect()

    db.collection('dailyGoals').find({ owner: owner }).toArray(function (err, docs) { 
      if (err) {
        response.status(500).send({error: err})
        return
      }
      if (!docs) {
        response.status(400).json({ error: 'Any daily goal from this user was found' })
        return
      }
      response.send(docs)
      return
    });

  } else if (request.method === 'POST') {
    response.status(400).json({ message: 'Wrong method' })
  }

}
