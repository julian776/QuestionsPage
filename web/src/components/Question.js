import React, { Fragment, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {BiHappyHeartEyes} from 'react-icons/bi'
import {MdMoodBad} from 'react-icons/md'
import {RiEmotionUnhappyLine} from 'react-icons/ri'
import { useSelector } from 'react-redux'

const URL_BASE = 'http://localhost:8080';

export const Question = ({ question, excerpt, onDelete }) => {

  const location = useLocation()

  const userId = useSelector(state => state.auth.uid)

  const [register, setRegister] = useState([])

  const [listVotos, setListVotos] = useState([])

  const [votos, setVotos] = useState({})

  useEffect(() => {
    fetch(`${URL_BASE}/votes/${question.id}`)
    .then(response => response.json())
    .then(json => json.map((voto) => {
      setListVotos([
        ...listVotos,
        {
          userId: voto.userId,
          voto: voto.voto
        }
      ])
    }))
    .then(() => {calcularTotalVotos()})
  }, [register])

  const calcularTotalVotos = () => {
    var total = {
      usersId: [], 
      feliz: 0,
      normal:0, 
      disgusto:0
    }
    listVotos.map((voto) => {
      if(voto.userId in total){}
      else if(voto.voto == 2){
        total.feliz = total.feliz+1  
      }
      else if(voto.voto == 1){
        total.normal = total.normal+1
      }
      else if(voto.voto == 0){
        total.disgusto = total.disgusto+1
      }
    })
    setVotos(total)
  }

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
  }, [register])
  
  function handleVote(vote) {
    if(userId in votos.usersId){
      return ""
    }
    setRegister([...register, 0])
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
    
    fetch(`${URL_BASE}/add/vote`,  {
      method: 'POST',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: question.id,
        userId:userId,
        voto: voto})
    })
  }

  return (
  <article className={excerpt ? 'question-excerpt' : 'question'}>
    <h2>{question.question}</h2>
    <h4>{location.pathname != '/questions' && PromedioCaritas()}</h4> 
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