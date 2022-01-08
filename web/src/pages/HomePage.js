import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = ({children}) => (
  <section className='home-section'>
    <h1 className='home-title'>Home</h1>
    <p>welcome to the question and answer app.</p>
    <div>
      {children}
    </div>
  </section>
)
export default HomePage
