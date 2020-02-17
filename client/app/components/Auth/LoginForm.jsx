import React, { useState, useRef } from 'react'
import { Redirect } from 'react-router-dom'

//import ReCAPTCHA from "react-google-recaptcha";

//import Unsplash, { toJson } from 'unsplash-js'
//import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_disabled_web.png'
//import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png'
/* const unsplash = new Unsplash({ 
	accessKey: "087974b986846a742f7b79b785d09baafceaa494a1713e28aac8af3e6cba565e",
	secret: "9c22b17a6076eac65bb4f54a9bef93d21d3a4aec4827e48e433fa8185879a51e"
}) */



const LoginForm = (props) =>{
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [redirectTo, setRedirectTo] = useState(null)
	const userEl = useRef(null);
	const passEl = useRef(null);
	const warning = useRef(null);
	const checkEl = useRef(null);
	const buttonEl = useRef(null);
//	const [bg,setBg] = useState(null)

	/* const fotoBg = () => {
		try {
			unsplash.photos.getRandomPhoto({ query: "surf" })
			.then(toJson)
			.then(json => {
				setBg(json)
			});
		} catch (error) {
			console.log(error)	
		}
	} */

/* 	useEffect(()=>{
		//fotoBg()
	},[])
	useEffect(()=>{
		if(bg!=null){
			console.log('bg agregado')
			console.log(bg)
			document.getElementById('bg').style.backgroundImage = `url('${bg.urls.full}')`
			document.getElementById('bg').style.backgroundSize = 'cover'
		}
        
	},[bg]) */

	function handleUsernameChange(event) {
		setUsername(event.target.value)
		if(event.target.value.lenght < 3){
			event.target.classList.remove('is-valid')
			event.target.classList.add('is-invalid')
		}else{
			event.target.classList.remove('is-invalid')
			event.target.classList.add('is-valid')
		}
	}
	function handlePasswordChange(event) {
		setPassword(event.target.value)
		if(event.target.value.lenght < 5){
			event.target.classList.remove('is-valid')
			event.target.classList.add('is-invalid')
		}else{
			event.target.classList.remove('is-invalid')
			event.target.classList.add('is-valid')
		}
	}

	function validate(){
//		buttonEl.current.innerText = 'Login'
		if(userEl.current.classList.contains('is-valid') && passEl.current.classList.contains('is-valid')){
			if(checkEl.current.checked === true){
				buttonEl.current.disabled = false
				buttonEl.current.classList.remove('btn-danger')
				buttonEl.current.classList.remove('btn-warning')
				buttonEl.current.classList.add('btn-primary')
			}else{
				buttonEl.current.disabled = true
				buttonEl.current.classList.remove('btn-danger')
				buttonEl.current.classList.remove('btn-warning')
				buttonEl.current.classList.add('btn-primary')
			}
		}
	}
	
	function handleSubmit(event) {
		buttonEl.current.disabled = true
		checkEl.current.disabled=true
		checkEl.current.checked=false
		buttonEl.current.innerText = 'Loading...'
		props._login(username, password).then((res)=>{
			if(res.status === 200){
				buttonEl.current.classList.remove('btn-primary')
				buttonEl.current.classList.add('btn-success')
				buttonEl.current.innerText = 'Login Success!'
				setRedirectTo('/')
			}else{
				buttonEl.current.classList.remove('btn-primary')
				buttonEl.current.classList.remove('btn-success')
				buttonEl.current.classList.add('btn-danger')
				if(res.status === 401){
					warning.current.innerText=res.data.error
					warning.current.classList.remove('d-none')
					warning.current.classList.remove('alert-success')
					warning.current.classList.add('alert-danger')
				}
				buttonEl.current.innerText = 'Login FAIL!'
			}
		} )
		passEl.current.value=''
		event.preventDefault();
		//setRedirectTo('/')
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
				<form onSubmit={handleSubmit} className="card-body">
					<div className="form-group w-100">
						<div ref={warning} className="alert alert-warning d-none" role="alert"></div>
						<label class="sr-only" for="inlineFormInputGroup">Usuario</label>
						<div class="input-group mb-2">
							<div class="input-group-prepend">
							  <div class="input-group-text">@</div>
							</div>
							<input
								type="text"
								ref={userEl}
								name="username"
								id="inlineFormInputGroup" placeholder="Username"
								className="form-control"
								value={username}
								onChange={handleUsernameChange}
							/>
						</div>
						<label class="sr-only" for="inlineFormInputGroupPassword">Password</label>
						<div class="input-group mb-2">
							<div class="input-group-prepend">
							  <div class="input-group-text">**</div>
							</div>
							<input
								type="password"
								ref={passEl}
								name="password"
								id="inlineFormInputGroupPassword" placeholder="Password"
								className="form-control"
								value={password}
								onChange={handlePasswordChange}
							/>
						</div>
						<div class="form-check ml-auto">  
							<input
								type="checkbox"
								ref={checkEl}
								id="Check1"
								className="form-check-input"
								onChange={()=>validate()}
							/>
							<label class="form-check-label" for="Check1">No soy un Robot :)</label>
						</div>
							
					<button ref={buttonEl} type="submit" disabled className="mt-2 btn btn-primary btn-lg btn-block">Login</button>
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
