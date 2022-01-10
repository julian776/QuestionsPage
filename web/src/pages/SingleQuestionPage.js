import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchQuestion } from '../actions/questionActions'

import { Question } from '../components/Question'
import { Answer } from '../components/Answer'
import { Link } from 'react-router-dom'

const SingleQuestionPage = ({match}) => {
  
  const [question, userId] = useSelector(state => [state.question, state.auth.uid])
  const dispatch = useDispatch()
  const { id } = match.params

  useEffect(() => {
    dispatch(fetchQuestion(id))
  }, [dispatch, id])

  const renderQuestion = () => {
    if (question.loading.question) return <p>Loading question...</p>
    if (question.hasErrors.question) return <p>Unable to display question.</p>

    return <Question question={question.question} />
  }

  const renderAnswers = () => {
    return (question.question.answers && question.question.answers.length) ? question.question.answers.map(answer => (
      <Answer key={answer.id} answer={answer} />
    )) : <p>Empty answer!</p>;
  }

  return (
    <section>
      {renderQuestion()}
      {userId && <Link to={"/answer/" + id} className="button right">
        Reply
      </Link>}

      <h2>Answers</h2>
      {renderAnswers()}
    </section>
  )
}

export default SingleQuestionPage
