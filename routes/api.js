const express = require('express')

const Question = require('../models/question')
const { isAuthenticated } = require('../middlewares/isAuthenticated')
const router = express.Router()

router.get('/questions', (req, res) => {
  res.send(`welcome to questions ${req.session.username}`)
})

router.post('/questions/add', isAuthenticated, async (req, res) => {
    const { questionText, author } = req.body
    try {
        await Question.create({ questionText, author })
        res.send('question created succesfully')
      } catch (err) {
        res.send(`failure to create the question. err: ${err}`)
      }
  })

  router.post('/questions/answer', isAuthenticated, async (req, res, next) => {
    const { _id, answer } = req.body
    await Question.findById(_id, async (err, question) => {
      if (err) {
        return next(err)
      }
      if (question) {
        try {
          question.answer = answer
          await question.save()
          res.send('answer added')
        } catch {
          res.send('failed to add answer')
        }
      } else {
        res.send('could not add answer')
      }
    })
  })

module.exports = router