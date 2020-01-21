import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const SignupForm = (props) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
 	const [confirmPassword, setConfirmPassword] = useState('')
	const [redirectTo, setRedirectTo] = useState(null)
	const btnRegistro = useRef()
	const warning = useRef()
	const form = useRef()


	function handleUsernameChange(event) {
		setUsername(event.target.value)
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
	}

	function handleSubmit(event) {
		event.preventDefault()
		axios
			.post('/auth/signup', {
				username,
				password
			})
			.then(response => {
				console.log(response)
				if(response.data.error){
					warning.current.innerText=response.data.error
					warning.current.classList.remove('d-none')
					warning.current.classList.remove('alert-success')
					warning.current.classList.add('alert-danger')
				}
				/* if (!response.data.error) {
					setRedirectTo('/login')
				} else {
					alert(response.data.error)
				} */
			})
	}

	return(
		redirectTo
		? <Redirect to={{ pathname: redirectTo }} />
		:
		<div id="bg" className="position-absolute w-100 h-100">
		<div className="mt-5 card col-sm-12 col-md-8 col-lg-4 p-0 mx-auto">
			<div className="card-header">
			<h1 className="h2">Registro de usuario</h1>
			</div>
			<form ref={form} className="card-body">
				<div className="form-group w-100">
					<div ref={warning} className="alert alert-warning d-none" role="alert"></div>
					<label htmlFor="username">User: </label>
					<input
						type="text"
						name="username"
						className="form-control mb-2"
						value={username}
						onChange={handleUsernameChange}
					/>

					<label htmlFor="password">Pass : </label>
					<input
						type="password"
						name="password"
						className="form-control"
						value={password}
						onChange={handlePasswordChange}
					/>

					<label htmlFor="confirmPassword">Confirm Pass : </label>
					<input
						type="password"
						name="confirmPassword"
						className="form-control"
						value={confirmPassword}
						onChange={handleConfirmPasswordChange}
					/>
				<a ref={btnRegistro} onClick={handleSubmit} className="mt-2 btn btn-primary btn-lg btn-block" disabled>Registrarse</a>
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
