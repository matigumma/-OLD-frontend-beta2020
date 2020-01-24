import React, { useState, useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
const baseUrl = config.baseUrl
import config from '../../../config'

//import axios from 'axios'
const axios = lazy(() => import('axios'))
//import Header from '../Header/Header'
const Header = lazy(() => import('../Header/Header'))
//import Home from '../../pages/Home/Home'
const Home = lazy(() => import('../../pages/Home/Home'))
//import LoginForm from '../Auth/LoginForm.jsx'
const LoginForm = lazy(() => import('../Auth/LoginForm.jsx'))
//import SignupForm from '../Auth/SignupForm.jsx'
const SignupForm = lazy(() => import('../Auth/SignupForm.jsx'))
//import CameraView from '../../pages/CameraView'
const CameraView = lazy(() => import('../../pages/CameraView'))

import NotFound from '../../pages/NotFound'

import Loading from '../Loading'

async function getCameras() {
    try {
        const response = await axios({
            url: `${baseUrl}/cameras-list`,
            method: 'GET'
        })
        
        return response
    } catch (error) {
        console.log(error)
    }
}
async function getAds() {
    try {
        const response = await axios({
            url: `${baseUrl}/anuncios-cameras-list`,
            method: 'GET'
        })
        
        return response
    } catch (error) {
        console.log(error)
    }
}

function UserProfile(props){
	//console.log(props)
	return ('Hola User profile')
}

async function getUser() {
    try {
        const response = await axios({
            url: '/auth/user',
            method: 'GET'
        })
        
        return response
    } catch (error) {
        console.log(error)
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
        console.log(error)
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
        console.log(error)
    }
}

const App = () =>{
	const [loggedIn, setLoggedIn] = useState(false)
	//const [splash, setSplash] = useState(true)
	const [user, setUser] = useState(null)
	const [cameras, setCameras] = useState([])
    const [ads, setAds] = useState([])
	const [wannaLogin, setWannaLogin] = useState(false)

	useEffect(()=>{
		async function loadUser () {//first load of app
            const res = await getUser()
			
			if (!!res.data.user) {
				//console.log('THERE IS A USER: ', res.data.user)
				setLoggedIn(true)
				setUser(res.data.user)
			} else {
				setTimeout(() => {
					setWannaLogin(true)
				}, 10000);
			}
        }
       
		loadUser()
		
//cams

		async function loadAds () {
			const resA = await getAds()
			if(resA.status === 200) {
				//console.log('anuncios: ',resA)
				setAds(resA.data)
				//setIsLoading(false)
				//setSplash(false)
			}
		}
		async function loadCams () {
			const res = await getCameras()
			//console.log('camaras: ',res)
			if(res.status === 200) {
				setCameras(res.data)
				loadAds()
			}
		}

		loadCams()

	},[])

	async function _logout(event) {
		event.preventDefault()
		console.log('logging out')
		const res = await getLogout()
		if (res.status === 200) {
			setLoggedIn(false)
			setUser(null)
		}else{
			console.log('Err while trying to logout.. try again')
		}
	}

	async function _login(username, password) {
		const res = await getLogin(username, password)
		console.log('loggin in..')
		if (res.status === 200) {
			setLoggedIn(true)
			setUser(res.data.user)
		}else{
			alert('Error while trying to log in..')
		}
	}

/* 	splash? <Loading />
	: */
	return (
		<Router>
		<div className="h-100">
			<Header cameras={cameras} state={user} _logout={_logout} />
			<main className="h-100">
				<Switch>
				<Route exact path="/" render={() => <Home ads={ads} cameras={cameras} userState={user} />} />
				<Route exact path="/login" render={() => <LoginForm _login={_login} />}/>
				<Route exact path="/user/:id" render={(props) => <UserProfile {...props} userState={user} />}/>
				<Route exact path="/cam/:any" render={(state) => <CameraView {...state} cameras={cameras} userState={user} />}/>
				<Route exact path="/signup" component={() => <SignupForm />} />
				<Route path="/404" render={(state) => <NotFound {...state}/>} />
				</Switch>
			</main>
		</div>
		</Router>
	)
}

export default App
