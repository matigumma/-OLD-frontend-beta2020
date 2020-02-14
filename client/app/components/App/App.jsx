import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import loadable from '@loadable/component'
import '../../styles/main.scss';
import './App.scss'

//import config from '../../../config'

//const baseUrl = config.baseUrl

import axios from 'axios'
import { set } from 'mongoose';

//import Header from '../Header/Header'
const UserProfile = loadable(()=>import('../../pages/User'))

const Header = loadable(()=>import('../Header/Header'))
/* , {
	fallback: <div>Loading Header...</div>,
  } */
//import Home from '../../pages/Home/Home'
const Home = loadable(()=> import('../../pages/Home/Home'))

//import LoginForm from '../Auth/LoginForm.jsx'
const LoginForm = loadable(()=> import('../Auth/LoginForm.jsx'))

//import SignupForm from '../Auth/SignupForm.jsx'
const SignupForm = loadable(()=> import('../Auth/SignupForm.jsx'))

//import CameraView from '../../pages/CameraView'
const CameraView = loadable(()=> import ('../../pages/CameraView'))

//import NotFound from '../../pages/NotFound'
const NotFound = loadable(()=> import('../../pages/NotFound'))

//import Loading from '../Loading'

const StatusMsg = (props) => {
	return(
		props.show==true ?
		<div class={`alert alert-${props.kind} alert-dismissible fade show`} role="alert">
			{props.msg}
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
		: <></>
	)
}

async function getUser() {
	try {
		const response = await axios({
			url: '/auth/user',
            method: 'GET'
        })
		//console.log('getUser(): ',response)
        
        return response
    } catch (error) {
		return error
    }
}
async function getLogout(user) {
    try {
        const response = await axios({
			url: '/auth/logout',
			data: {user},
            method: 'POST'
        })
        
        return response
    } catch (error) {
		return error
    }
}
async function getLogin(username, password) {
    try {
        const response = await axios({
			url: '/auth/login',
			data: {
				username,
				password
			},
            method: 'POST'
        })
        
        return response
    } catch (error) {
		return error
    }
}

const App = () =>{
	const [loggedIn, setLoggedIn] = useState(false)
	//const [splash, setSplash] = useState(true)
	const [user, setUser] = useState(null)
	const [notiStatus, setNotiStatus] = useState({show:false,kind:'',msg:''})

	useEffect(()=>{
		async function loadUser () {//first load of app
			try {
				const res = await getUser()
				console.log('res del loadUser', res)
				if (res.data.user) {
					setLoggedIn(true)
					setUser(res.data.user)
				} else {
					setTimeout(() => {
						setNotiStatus({
							show:true,
							kind:'primary',
							msg:'ya te registraste?'
						})
					}, 10000);
				}
			} catch (error) {
				console.log(error)
			}
        }
		loadUser()
	},[])

	async function _logout(event) {
		event.preventDefault()
		//console.log('logging out')
		const res = await getLogout()
		if (res.status === 200) {
			setLoggedIn(false)
			setUser(null)
			return res
		}else{
			return res
		}
	}

	async function _login(username, password) {
		const res = await getLogin(username, password)
		if (res.status === 200) {
			setLoggedIn(true)
			setUser(res.data.user)
			return res
		}else{
			return res
		}
	}

/* 	splash? <Loading />
	: */
	return (
		<Router >
		<div className="h-100">
			{/* <Header cameras={cameras} state={user} _logout={_logout} /> */}
			<Header state={user} _logout={_logout} />
			<StatusMsg props={notiStatus} />
			<main className="h-100">
				{/* <Route exact path="/" render={() => <Home ads={ads} cameras={cameras} userState={user} />} /> */}
				<Route exact path="/" render={() => <Home userState={user} />} />
				<Route exact path="/login" render={() => <LoginForm loggedin={loggedIn} user={user} _login={_login} />}/>
				<Route exact path="/user/:id" render={(props) => <UserProfile userState={user} />}/>
				{/* <Route exact path="/cam/:any" render={(state) => <CameraView  cameras={cameras} userState={user} />}/> */}
				<Route exact path="/cam/:any" render={(state) => <CameraView {...state} userState={user} />}/>
				<Route exact path="/signup" component={() => <SignupForm />} />
				<Route path="/404" render={(state) => <NotFound {...state}/>} />
			</main>
		</div>
		</Router>
	)
}

export default App
