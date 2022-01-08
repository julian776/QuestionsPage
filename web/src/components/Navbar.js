import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {RiQuestionAnswerLine} from 'react-icons/ri'

export const PublicNavbar = () => (
  <nav>
    <RiQuestionAnswerLine className='icon' />
    <section>
      <Link to="/">Home</Link>
      <Link to="/questions">Questions</Link>
    </section>
  </nav>
)

export const PrivateNavbar = () => (
  <nav>
    <RiQuestionAnswerLine className='icon' />
    <section>
      <Link to="/">Home</Link>
      <Link to="/questions">Questions</Link>
      <Link to="/new">New</Link>
      <Link to="/list">List</Link>
    </section>
  </nav>
)
