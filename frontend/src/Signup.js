import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";
import Login from './Login'



const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const goHome = () => {
        history.push('/')
    }

    const signup = async () => {
        try {
            await axios.post('/account/signup', { username, password })
            goHome()
        } catch {
            window.alert('could not sign up')
        }
    }
      
    return (
        <div>
        Username: <input onChange={e => setUsername(e.target.value)} />
        Password: <input onChange={e => setPassword(e.target.value)} />
        <br></br>
        <button onClick={() => signup(username, password)}> register user </button>
        <br></br>
        <div className="form-group">
            Already have an account?<Link to="/login"> Login Here </Link>
        </div>        
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
        </Switch>
        </div>
    )
}

export default Signup