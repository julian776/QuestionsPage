import React, {useState} from 'react'
import { auth ,createUser, signInUser } from '../services/firebase'
import firebase from "firebase/app";
import {FcGoogle} from 'react-icons/fc'

function FormAuth({dispatch}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignUp = (event) => {
        event.preventDefault()
        createUser(email, password)
    }

    const handleSignIn = (event) => {
        event.preventDefault()
        signInUser(email, password)
    }

    return (
        <div>
            <form>
                <label htmlFor='email' >Email</label>
                <input type="email" id='email' 
                onChange={(event) => setEmail(event.target.value) }
                required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password"
                onChange={(event) => setPassword(event.target.value)} 
                required/>
                <div>
                    <button type="submit" onClick={handleSignUp} className='button'>Sign Up</button>
                    <button type="submit" onClick={handleSignIn} className='button'>Sign In</button>
                    Other provider
                    <button className='button-google' onClick={signInWithGoogle}><FcGoogle /></button>
                </div>
            </form>
        </div>
    )
}

const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
};

export default FormAuth