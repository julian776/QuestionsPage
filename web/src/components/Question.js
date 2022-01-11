import React, { Fragment, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {BiHappyHeartEyes} from 'react-icons/bi'
import {MdMoodBad} from 'react-icons/md'
import {RiEmotionUnhappyLine} from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { URL_BASE } from '../utils/URL_BASE'


export const Question = ({ question, excerpt, onDelete }) => {

  const location = useLocation()
  const userId = useSelector(state => state.auth.uid)
  const state = useSelector(state => state)

  var listUsers = {usersId:[]}
  var listVotos = []

  const calcularTotalVotos = () => {
    let total = {
      feliz: 0,
      normal:0, 
      disgusto:0
    }
    listVotos.map((voto) => {
      if(voto.voto == 2){
        total.feliz = total.feliz+1  
      }
      else if(voto.voto == 1){
        total.normal = total.normal+1
      }
      else if(voto.voto == 0){
        total.disgusto = total.disgusto+1
      }
    })
    return total
  }

  const PromedioCaritas = () => {
      async function func(){
        const response = await fetch(`${URL_BASE}/votes/${question.id}`)
        var data = await response.json()
        return data
      }
      /*data.map((voto) => {
          listVotos.push({
            voto: voto.voto
          })
        listUsers.usersId.push(voto.userId) 
      })*/
    var votos = calcularTotalVotos()
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
    return (
      <Fragment>
        Las personas han votado {toRender}
      </Fragment>
    )
  }
  
  async function handleVote(vote) {
    if(userId in listUsers.usersId){
      return ""
    }
    var voto = 0
    switch (vote) {
      case 2:
          voto=2
          break
        case 1:
          voto=1
          break
        case 0:
          voto = 0
          break
        default:
          voto = 2
    }
    await fetch(`${URL_BASE}/add/vote`,  {
      method: 'POST',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        questionId: question.id,
        userId:userId,
        voto: voto})
    })
  }

  return (
  <article className={excerpt ? 'question-excerpt' : 'question'}>
    <h2>{question.question}</h2>
    <h4 id='votos'>{location.pathname != '/questions' && PromedioCaritas()}</h4> 
    <p>
      {question.category}  - <small>{question.type}</small>
      {(location.pathname != '/questions' && location.pathname!='/list') &&
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