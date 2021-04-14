import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";
import axios from 'axios'
import Signup from './Signup'


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const goHome = () => {
        history.push('/')
    }

    const login = async () => {
        try {
            console.log("successfully logged in")
            await axios.post('/account/login', { username, password })
            goHome()
        } catch {
            window.alert('could not log in')
        }
    }

    return (
        <div>
        Username: <input onChange={e => setUsername(e.target.value)} />
        Password: <input onChange={e => setPassword(e.target.value)} />
        <br></br>
        <button onClick={() => login(username, password)}> Login </button>
        <br></br>
        <div className="form-group">
            Don't have an account?<Link to="/signup"> Sign up Here </Link>
        </div>        
        <Switch>
            <Route path="/signup">
                <Signup />
            </Route>
        </Switch>
        </div>
    )
  }

export default Login