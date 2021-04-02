const mongoose = require('mongoose')
const express = require('express')
const cookieSession = require('cookie-session')
const path = require('path')


const AccountRouter = require('./routes/account')
const QuestionRouter = require('./routes/api')

const app = express()
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'

mongoose.connect(MONGO_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.static('dist'))
app.use(express.json())

app.use(
  cookieSession({
    name: 'local-session',
    keys: ['annabanana'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
)

app.get('/', (req, res) => {
  res.send(`server route`)
})

app.use('/api', QuestionRouter)
app.use('/account', AccountRouter)

// IMPORTANT: U NEED THIS
app.get('/favicon.ico', (_, res) => res.status(404).send())
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

/**
 * Middleware for catching any errors
 */
 app.use((err, req, res, next) => {
   if (res.headersSent) {
     return next(err)
   }
   res.status(500)
   res.send(`There was an error: ${err.message}`)
})

app.listen(3000, () => {
  console.log('listening on 3000')
})