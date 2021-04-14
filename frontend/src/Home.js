import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import axios from 'axios'


const Home = () => {
    
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [author, setAuthor] = useState('')
    const [modalActive, setModalActive] = useState(false)
    const [questionsList, setQuestionsList] = useState([])

    useEffect(() => {
      const intervalID = setInterval(() => {
        getQuestions()
      }, 2000)
      const controller = new AbortController()
      controller.abort()
      // return a clean-up function so that the repetition can be stopped
      // when the component is unmounted
      return () => clearInterval(intervalID)
    }, [])
    
    axios({
        method: 'post', url: '/account/',
      }).then(response => {
        setAuthor(String(response.data))
    })
    
    const getQuestions = async () => {
        await axios({
            method: 'get',
            url: '/api/questions',
          })
        .then(response => {
            setQuestionsList(response.data)
        });
    }


    const addQuestion = async (questionText, author) => {
        try {
            await axios.post('/api/questions/add', { questionText, author })
            setModalActive(false)
        } catch (err) {
            window.alert(`error occured while adding question: ${err.response.data}`)
        }
      }

    const answerQuestion = async (_id, answer, author) => {
        try {
            await axios.post('/api/questions/answer', { _id, answer, author })
            setAnswer('')
        } catch (err) {
            window.alert(`error occured while answering question: ${err.response.data}`)
        }
    }
      
    const modalAppear = () => {
        setModalActive(true)
        setQuestion('')
    }

    const logout = async () => {
        try {
            await axios.post('/account/logout', { username: author })
            goHome()
        } catch {
            window.alert("did not log out")
        }
    }

    if (author !== '') {
        return (
          <>
            <div className="container">
                <br></br>
                <center><h1> <b>Campuswire Lite </b></h1></center>
                Welcome {author}!
                {msg}
                <br></br>
                <button type="button" className="btn btn-primary" onClick={modalAppear}>Add new question</button>
                <br></br>
                <br></br>
                <button type="button" className="btn btn-primary" onClick={logout}>Logout</button>
            </div>
    
            {modalActive
              && (
              <div>
                  <h5>Add Question</h5>
                  <input onChange={e => setQuestion(e.target.value)} placeholder="Write your question here..." />
                  <br />
                  <button onClick={() => addQuestion(question, author)}>Submit Question</button>
                  <button onClick={() => setModalActive(false)}>Cancel</button>
                </div>
              )}
            <div>
              {
            questionsList.map(q => (
              <div className="post">
                <div className="post-title" style={{ size: '16pt', color: 'blue', fontWeight: 'bold' }}>
                  Question: {q.questionText}
                </div>
                <div className="body">
                  Author: {q.author}
                </div>
                <div className="answer">
                  Answer: {q.answer}
                </div>
                <input
                  onChange={e => setAnswer(e.target.value)}
                  placeholder="Write your answer here..."
                />
                <button onClick={() => answerQuestion(q._id, answer, author)}>
                  Submit Answer
                </button>
                <br />
                <br />
                <br />
              </div>
            ))
            }
            </div>
          </>
        )
      }

    return (
        <>
          <div className="container">
            <br></br>
            <center><h1> <b>Campuswire Lite </b></h1></center>
            <li>Want to ask a question?<Link to="/login"> Login Here </Link> </li>
        </div>
          <br />
          <br />
    
          <div className="posts-container">
            {
            questionsList.map(q => (
              <div className="post">
                <div className="post-title" style={{ size: '16pt', color: 'blue', fontWeight: 'bold' }}>
                  Question: {q.questionText}
                </div>
                <div className="body">
                  Author: {q.author}
                </div>
                <div className="answer">
                  Answer: {q.answer}
                </div>
                <br />
                <br />
              </div>
            ))
            }
          </div>
        </>
      )

    
  }

export default Home