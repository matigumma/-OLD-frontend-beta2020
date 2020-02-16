import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const Validation = (props) => {
    const [redirectTo, setRedirectTo] = useState(null)
    const [username, setUsername] = useState(null)
    const warning = useRef()

    useEffect(()=>{
        const id = props.match.params.any
        axios
        .get('/auth/validate', {
            id
        })
        .then(response => {
            if(response.status === 200){
                /* setRedirectTo('/')
                return */
                console.log(`validando ${id} obtuvo status 200:`)
                console.log(response)
            }
            if(response.status === 404){
                setRedirectTo('/404')
                return
            }/* 
            if(response.status === 401){
                setUsername(response.data.username)
            } */
        })
    },[])
    function handleSubmit(event){
        axios
        .post('/auth/validate', {
            id
        })
        .then(response => {
            if(response.status === 200){
                setRedirectTo('/login')
            }
            if(response.status === 500){
                warning.current.classList.remove('d-none')
				warning.current.classList.add('alert-warning')
                warning.current.innerText='Hubo un error en el servidor al validar, intenta mas tarde'
                console.log('error 500 del handlesubmit: ',response.data.error)
            }
        })
        event.preventDefault()
    }

    return(
    redirectTo
    ? <Redirect to={{ pathname: redirectTo }} />
    :
    <div id="bg" className="position-absolute w-100 h-100">
    <div className="mt-5 card col-sm-12 col-md-8 col-lg-4 p-0 mx-auto">
        <from onSubmit={handleSubmit} className="form-group w-100">
            <div className="card-header">
                <h1 className="h2">Validacion de {username}!</h1>	
            </div>
            <div className="card-body">
                <div ref={warning} className="alert alert-warning d-none" role="alert"></div>
                <p>Hace click en el boton para validar la cuenta</p>
            </div>
            <div className="card-footer">
                <button type="submit" className="mt-2 btn btn-primary btn-lg btn-block" >Validar</button>
            </div>
        </from>
    </div>
    </div> 
  )}
export default Validation