import React, { useEffect } from 'react'

import { fetchQuestions } from '../actions/questionActions'
import { Question } from '../components/Question'
import { useSelector, useDispatch } from 'react-redux'


const QuestionsPage = () => {
    const state = useSelector(state => state.question)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])
    
    const renderQuestions = () => {
        if (state.loading) return <p>Loading questions...</p>
        if (state.hasErrors) return <p>Unable to display questions.</p>

        return state.questions.map(question => <Question key={question.id} question={question} excerpt />)
    }

    return (
        <section>
            <h1>Questions</h1>
            {renderQuestions()}
        </section>
    )
}
/*
const mapStateToProps = state => ({
    loading: state.question.loading,
    questions: state.question.questions,
    hasErrors: state.question.hasErrors,
})
*/

export default (QuestionsPage)
