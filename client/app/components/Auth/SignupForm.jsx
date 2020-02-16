import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const SignupForm = () => {
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
 	const [confirmPassword, setConfirmPassword] = useState('')
	const btnRegistro = useRef()
	const warning = useRef()
	const emailEl = useRef(null);
	const userEl = useRef(null);
	const passEl = useRef(null);
	const checkEl = useRef(null);

	function validate(){
		btnRegistro.current.innerText = 'Login'
		if(userEl.current.textLength >= 3 && passEl.current.textLength >= 5){
			checkEl.current.disabled=false
		}else{
			checkEl.current.disabled=true
			checkEl.current.checked=false
		}
		if(checkEl.current.checked == true){
			btnRegistro.current.classList.remove('btn-danger')
			btnRegistro.current.classList.add('btn-primary')
			btnRegistro.current.disabled = false
		}else{
			btnRegistro.current.disabled = true
		}
	}

	function handleEmailChange(event) {
		setEmail(event.target.value)
		validate()
	}
	function handleUsernameChange(event) {
		setUsername(event.target.value)
		if(event.target.value < 3){
			event.target.classList.remove('is-valid')
			event.target.classList.add('is-invalid')
		}else{
			event.target.classList.remove('is-invalid')
			event.target.classList.add('is-valid')
		}
		validate()
	}
	function handlePasswordChange(event) {
		setPassword(event.target.value)
		if(password.length > 5){
			if(event.target.value === confirmPassword){
				warning.current.innerText='Bien!'
				warning.current.classList.remove('alert-warning')
				warning.current.classList.add('alert-success')
				btnRegistro.current.disabled=false
			}else{
				btnRegistro.current.disabled=true
				warning.current.classList.remove('d-none')
				warning.current.classList.remove('alert-success')
				warning.current.classList.add('alert-warning')
				warning.current.innerText='no coinciden las password'	
			}
		}else{
			btnRegistro.current.disabled=true
			warning.current.classList.remove('d-none')
			warning.current.classList.remove('alert-success')
			warning.current.classList.add('alert-warning')
			warning.current.innerText='minimo 5 caracteres'
		}
		validate()
	}
	function handleConfirmPasswordChange(event) {
		setConfirmPassword(event.target.value)
		if(password.length > 5){
			if(event.target.value === password){
				warning.current.innerText='Bien!'
				warning.current.classList.remove('alert-warning')
				warning.current.classList.add('alert-success')
				btnRegistro.current.disabled=false
			}else{
				btnRegistro.current.disabled=true
				warning.current.classList.remove('d-none')
				warning.current.classList.remove('alert-success')
				warning.current.classList.add('alert-warning')
				warning.current.innerText='no coinciden las password'	
			}
		}else{
			btnRegistro.current.disabled=true
			warning.current.classList.remove('d-none')
			warning.current.classList.remove('alert-success')
			warning.current.classList.add('alert-warning')
			warning.current.innerText='minimo 5 caracteres'
		}
		validate()
	}

	function handleSubmit(event) {
		btnRegistro.current.disabled = true
		checkEl.current.disabled=true
		checkEl.current.checked=false
		btnRegistro.current.classList.remove('btn-primary')
		btnRegistro.current.classList.add('btn-warning')
		btnRegistro.current.innerText = 'Loading...'
		axios
			.post('/auth/signup', {
				email,
				username,
				password
			})
			.then(response => {
				if(response.status === 200){
					warning.current.classList.remove('d-none')
					warning.current.classList.remove('alert-warning')
					warning.current.classList.add('alert-success')
					warning.current.innerText=`Listo! revisa tu correo ${email} para validar`
					btnRegistro.current.classList.remove('btn-warning')
					btnRegistro.current.classList.add('btn-success')
					btnRegistro.current.innerText = 'Revisa tu email!'
					btnRegistro.current.disabled = true
					//setRedirectTo('/login')
				}
				if(response.data.error){
					warning.current.innerText=response.data.error
					warning.current.classList.remove('d-none')
					warning.current.classList.remove('alert-success')
					warning.current.classList.add('alert-danger')
					passEl.current.value=''
				}
				/* if (!response.data.error) {
					setRedirectTo('/login')
				} else {
					alert(response.data.error)
				} */
			})
			event.preventDefault()
	}

	return(
		<div id="bg" className="position-absolute w-100 h-100">
		<div className="mt-5 card col-sm-12 col-md-8 col-lg-4 p-0 mx-auto">
			<div className="card-header">
			<h1 className="h2">Registro de usuario</h1>	
			</div>
			<form onSubmit={handleSubmit} className="card-body">
				<div className="form-group w-100">
					<div ref={warning} className="alert alert-warning d-none" role="alert"></div>
					<label class="sr-only" for="inlineFormInputGroup">E-mail</label>
					<div class="input-group mb-2">
						<input
							type="email"
							ref={emailEl}
							name="email"
							id="inlineFormInputGroup" placeholder="e-mail"
							className="form-control"
							value={email}
							onChange={handleEmailChange}
						/>
					</div>
					<label class="sr-only" for="inlineFormInputGroup">Usuario</label>
					<div class="input-group mb-2">
						<div class="input-group-prepend">
							<div class="input-group-text">@</div>
						</div>
						<input
							type="text"
							ref={userEl}
							name="username"
							id="inlineFormInputGroup" placeholder="Usuario"
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
					<label class="sr-only" for="inlineFormInputGroupconfirmPassword">Confirmar Password</label>
					<div class="input-group mb-2">
						<div class="input-group-prepend">
							<div class="input-group-text">**</div>
						</div>
						<input
							type="password"
							name="confirmPassword"
							id="inlineFormInputGroupconfirmPassword" placeholder="Confirmar Password"
							className="form-control"
							value={confirmPassword}
							onChange={handleConfirmPasswordChange}
						/>
					</div>
					<div class="form-check ml-auto">  
						<input
							type="checkbox"
							disabled
							ref={checkEl}
							id="Check1"
							className="form-check-input"
							onChange={()=>validate()}
						/>
						<label class="form-check-label" for="Check1">No soy un Robot :)</label>
					</div>
				<button ref={btnRegistro} className="mt-2 btn btn-primary btn-lg btn-block" disabled>Registrarse</button>
				{/* <a href="/auth/google" className="btn btn-outline-info btn-lg btn-block">
					<img src='/assets/img/btn_google_signin_dark_normal_web.png' alt="sign into Google Button" />
				</a> */}
				</div>
			</form>
		</div>
		</div>
	)

/* 
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
			<div className="SignupForm">
				<h1>Signup form</h1>
				<label htmlFor="username">Username: </label>
				<input
					type="text"
					name="username"
					value={this.state.username}
					onChange={this.handleChange}
				/>
				<label htmlFor="password">Password: </label>
				<input
					type="password"
					name="password"
					value={this.state.password}
					onChange={this.handleChange}
				/>
				<label htmlFor="confirmPassword">Confirm Password: </label>
				<input
					type="password"
					name="confirmPassword"
					value={this.state.confirmPassword}
					onChange={this.handleChange}
				/>
				<button onClick={this.handleSubmit}>Sign up</button>
			</div>
		)
	} */
}

export default SignupForm
