const express = require("express")
const app = express()
const MongoClient = require("mongodb").MongoClient

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*")

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  )

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")

  // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true)

  // Pass to next layer of m"id"dleware
  next()
})

app.listen(3001, function () {
  console.log("listening on 3001")
})

MongoClient.connect(
  "mongodb+srv://admin:admin@cluster0.ksyuz.mongodb.net/Movies?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
  }
).then((client) => {
  console.log("Connected to Database")
  const db = client.db("Movies")
  const Movies = db.collection("Movies")

  app.get("/films", function (req, res) {
    Movies.find()
      .toArray()
      .then((results) => res.send(results))
      .catch((error) => console.error(error))
  })

  // app.post("/films", (req, res) => {
  //   console.log(req.body)
  // })

  // app.delete("/films", function (req, res) {
  //   res.send(MOVIES)
  // })
})

// Movies.insertOne(req.body)
// .then((result) => {
//   console.log(result)
// })
// .catch((error) => console.error(error))
