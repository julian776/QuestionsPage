import React, { Fragment, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {BiHappyHeartEyes} from 'react-icons/bi'
import {MdMoodBad} from 'react-icons/md'
import {RiEmotionUnhappyLine} from 'react-icons/ri'
import { useSelector } from 'react-redux'

export const Question = ({ question, excerpt, onDelete }) => {

  const location = useLocation()

  const userId = useSelector(state => state.auth.uid)

  const [votos, setVotos] = useState({
    userId:"",
    feliz:0,
    normal:0,
    disgusto:0
  })

  const PromedioCaritas = () => {
    let total = votos.feliz + votos.normal + votos.disgusto
    let toRender = <MdMoodBad />
    if(votos.feliz >= total*0.65){
      toRender = <BiHappyHeartEyes />
    }
    else if(votos.normal >= total*0.65){
      toRender = <MdMoodBad />
    }
    else if(votos.disgusto >= total*0.65){
      toRender = <RiEmotionUnhappyLine />
    }
    return(
      <Fragment>
        Las personas han votado {toRender}
      </Fragment>
    )
  }

  useEffect( () => {
    PromedioCaritas()
  }, [setVotos])
  
  function handleVote(vote) {
    if(userId === votos.userId){
      return ""
    }
    switch (vote) {
      case 2:
        return setVotos({...votos, feliz: votos.feliz + 1, userId: userId})
        case 1:
          return setVotos({...votos, normal: votos.normal + 1, userId:userId})
        case 0:
        return setVotos({...votos, disgusto: votos.disgusto + 1, userId:userId})
        default:
          return ""
      }
  }

  return (
  <article className={excerpt ? 'question-excerpt' : 'question'}>
    <h2>{question.question}</h2>
    <h4>{location.pathname != '/questions' && PromedioCaritas()}</h4> 
    <p>
      {question.category}  - <small>{question.type}</small>
      {location.pathname != '/questions' &&
      <Fragment>
        <button onClick={() => handleVote(2)} className='button-vote'><BiHappyHeartEyes /></button>
        <button onClick={() => handleVote(1)} className='button-vote'><MdMoodBad /></button>
        <button onClick={() => handleVote(0)} className='button-vote'><RiEmotionUnhappyLine /></button>    
      </Fragment>
      }
    </p>
   
    {onDelete && (
      <button className="button right" onClick={() => onDelete(question.id)}>DELETE</button>
    )}
    {excerpt && (
      <Link to={`/question/${question.id}`} className="button">
        View Question
      </Link>
    )}
  </article>
)}