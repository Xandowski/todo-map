// import { MongoClient } from 'mongodb'

// const client = new MongoClient(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

// export default async function connect() {
//   if (!client.isConnected()) await client.connect()
//   const db = client.db('todo-map')
//   return { db, client }

// }


import { MongoClient } from 'mongodb'

let uri = process.env.DATABASE_URL || "" // trick ts :(
let dbName = 'todo-map'

var cachedClient, cachedDb

export default async function connect() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const db = await client.db(dbName)

  cachedClient = client
  cachedDb = db

  return { db, client }
}