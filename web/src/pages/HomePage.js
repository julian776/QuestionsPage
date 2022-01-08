import React from 'react'
import { Link } from 'react-router-dom'
import BasicLogin from '../components/BasicLogin'

const HomePage = ({children}) => (
  <section>
    <h1 className='home-title'>Home</h1>
    <div>
      {children}
    </div>
    <p>welcome to the question and answer app.</p>
    <BasicLogin />
    <Link to="/questions" className="button">
      View Questions
    </Link>
  </section>
)
export default HomePage
