import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
async function prevalidationUser(id) {
	try {
		let prevalidationUser_response = await axios({
            url: '/auth/validate',
            data:{
                id
            },
            method: 'GET'
        })
		console.log('prevalidationUser(): ',prevalidationUser_response)
        
        return prevalidationUser_response
    } catch (prevalidationUser_error) {
		return prevalidationUser_error
    }
}
const Validation = (props) => {
    const [redirectTo, setRedirectTo] = useState(null)
    const [username, setUsername] = useState(null)
    const warning = useRef()

    useEffect(()=>{
        const id = props.match.params.id
        async function prevalidation () {//first load of app
			let prevalidationUser_res = await prevalidationUser()
			if (prevalidationUser_res.data!=null) {
                if (prevalidationUser_res.status === 200) {
                    console.log(`validando ${id} obtuvo status 200:`)
                    console.log(prevalidationUser_res)
                    setUsername(prevalidationUser_res.data.local.username)
                }else{
                    setRedirectTo('/404')
                }
			}
        }
		prevalidation()
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