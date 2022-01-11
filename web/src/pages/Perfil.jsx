import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { convertCompilerOptionsFromJson } from 'typescript'
import { getUserEmail, getUserUid } from '../services/firebase'
import { URL_BASE } from '../utils/URL_BASE'

export default function Perfil() {
    
    const [nombre, setNombre] = useState({
        nombre: "",
        apellido: ""
    })

    useEffect(() => {
        (async function getData(){
            try {
              const response = await fetch(`${URL_BASE}/user/${getUserUid()}`);
              const data = await response.json();
              setNombre(data)
            } catch (error) {
              console.log("Failed to get data");
            }
        })()
    }, [])
    
    const postNewInformation = (event) => {
        event.preventDefault()
        const data = {
            nombre: nombre.nombre,
            apellido: nombre.apellido,
            email: getUserEmail(),
            id: getUserUid()
        }
        fetch(`${URL_BASE}/user`, 
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        ).then(response => setNombre(response.json()))
    }

    return (
        <form>
            <label htmlFor="name">Nombre</label>
            <input type="text" id='name' placeholder={nombre.nombre || "Not found"} onChange={(event) => setNombre({...nombre, nombre:event.target.value})} required />
            <label htmlFor="apellido">Apellido</label>
            <input type="text" id='apellido' placeholder={nombre.apellido || "Not found"} onChange={(event) => setNombre({...nombre, apellido:event.target.value})} required />
            <button type="submit" className='button' onClick={postNewInformation} >Save Changes</button>
        </form>
    )
}
