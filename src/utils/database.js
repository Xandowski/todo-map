/* This is a database connection function*/
import mongoose from 'mongoose'

const connection = {} /* creating connection object*/

async function connect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return
  }

  /* connecting to our database */
  const db = await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })

  connection.isConnected = db.connections[0].readyState
}

export default connect


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


// import { MongoClient } from 'mongodb'

// let uri = process.env.DATABASE_URL || "" // trick ts :(
// let dbName = 'todo-map'

// var cachedClient, cachedDb

// export default async function connect() {
//   if (cachedClient && cachedDb) {
//     return { client: cachedClient, db: cachedDb }
//   }

//   const client = await MongoClient.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })

//   const db = await client.db(dbName)

//   cachedClient = client
//   cachedDb = db

//   return { db, client }
// }