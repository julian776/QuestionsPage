import React, {useState} from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { createUser } from '../services/firebase'

function BasicLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault()
        createUser(email, password)
        history.push("/questions")    
    }

    return (
        <div>
            <form>
                <label htmlFor='email'>Email</label>
                <input type="email" name='email' 
                onChange={(event) => setEmail(event.target.value) }
                required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password"
                onChange={(event) => setPassword(event.target.value)} 
                required/>
                <button type="submit" onClick={handleSubmit} className='button'>Save</button>
            </form> 
        </div>
    )
}

export default BasicLogin