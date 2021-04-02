const express = require('express')

const User = require('../models/user')
const { isAuthenticated } = require('../middlewares/isAuthenticated')
const router = express.Router()

router.get('/', (req, res) => {
  res.send(`welcome to accounts`)
})

router.post('/signup', async (req, res) => {
    const { username, password } = req.body
    try {
        await User.create({ username, password })
        res.send('user created succesfully')
      } catch {
        res.send('failure to create the user')
      }
  })

router.post('/login', (req, res, next) => {
  const { username, password } = req.body

   User.findOne({ username, password }, (err, user) => {
    if (err) {
      return next(new Error('username, password doesnt exist'))
    }
    if (user) {
      req.session.username = username
      req.session.password = password
      console.log(req.session)
      res.send(`logged in as ${username}`)
    } else {
      res.send(`failed to log in`)
    }
  })
})

router.post('/logout', isAuthenticated, (req, res) => {
    const user = req.session.username
    req.session.username = ''
    req.session.password = ''
    res.send(`user ${user} logged out`)
})

module.exports = router