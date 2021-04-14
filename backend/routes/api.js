const express = require('express')

const Question = require('../models/question')
const { isAuthenticated } = require('../middlewares/isAuthenticated')
const router = express.Router()

router.get('/questions', (req, res) => {
  Question.find({}, async (err, result) => {
    if (err) {
      next(err)
    } else {
      res.send(result)
    }
  })
})

router.post('/questions/add', isAuthenticated, async (req, res) => {
    try {
        const { questionText, author } = req.body
        await Question.create({ questionText, author })
        res.send('question created succesfully')
      } catch (err) {
        res.send(`failure to create the question. err: ${err}`)
      }
  })

  router.post('/questions/answer', isAuthenticated, async (req, res, next) => {
    const { _id, answer, author } = req.body
    await Question.findById(_id, async (err, question) => {
      if (err) {
        return next(err)
      }
      if (question) {
        try {
          question.answer = answer
          await question.save()
          res.send('answer added')
        } catch (err) {
          res.send('failed to add answer')
        }
      } else {
        res.send('could not add answer')
      }
    })
  })

module.exports = router