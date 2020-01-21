import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Unsplash, { toJson } from 'unsplash-js'
// import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_disabled_web.png'
//import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png'
const unsplash = new Unsplash({ 
	accessKey: "087974b986846a742f7b79b785d09baafceaa494a1713e28aac8af3e6cba565e",
	secret: "9c22b17a6076eac65bb4f54a9bef93d21d3a4aec4827e48e433fa8185879a51e"
})



const LoginForm = (props) =>{
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [redirectTo, setRedirectTo] = useState(null)
	const [bg,setBg] = useState(null)

	const fotoBg = () => {
		try {
			unsplash.photos.getRandomPhoto({ query: "surf" })
			.then(toJson)
			.then(json => {
			  setBg(json)
			});
		} catch (error) {
			console.log(error)	
		}
	}

	useEffect(()=>{
		//fotoBg()
	},[])
	useEffect(()=>{
		if(bg!=null){
			console.log('bg agregado')
			console.log(bg)
			document.getElementById('bg').style.backgroundImage = `url('${bg.urls.full}')`
			document.getElementById('bg').style.backgroundSize = 'cover'
		}
        
	},[bg])

	function handleUsernameChange(event) {
		setUsername(event.target.value)
	}
	function handlePasswordChange(event) {
		setPassword(event.target.value)
	}

	function handleSubmit(event) {
		event.preventDefault()
		console.log('handleSubmit')
		props._login(username, password)
		setRedirectTo('/')
		/* this.setState({
			redirectTo: '/'
		}) */
	}

	/* render() { */
		return(
			redirectTo
			? <Redirect to={{ pathname: redirectTo }} />
			:
			<div id="bg" className="position-absolute w-100 h-100">
			<div className="mt-5 card col-sm-12 col-md-8 col-lg-4 p-0 mx-auto">
				{/* <div className="card-header">
					<h1>Login form</h1>
					</div> */}
				<form className="card-body">
					<div className="form-group w-100">
						<label htmlFor="username">User: </label>
						<input
							type="text"
							name="username"
							className="form-control mb-2"
							value={username}
							onChange={handleUsernameChange}
						/>

						<label htmlFor="password">Pass: </label>
						<input
							type="password"
							name="password"
							className="form-control"
							value={password}
							onChange={handlePasswordChange}
						/>
					<button onClick={handleSubmit} className="mt-2 btn btn-primary btn-lg btn-block">Login</button>
						{/* <GoogleButton /> 
					<a href="/auth/google" className="btn btn-outline-info btn-lg btn-block">
						<img src='/assets/img/btn_google_signin_dark_normal_web.png' alt="sign into Google Button" />
					</a>*/}
					</div>
				</form>
			</div>
			</div>
		)
	/* } */
}
export default LoginForm