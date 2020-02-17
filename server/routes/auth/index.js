const express = require('express')
const router = express.Router()
//const User = require('../../../models/User')
const User = require('../../models/User')
const passport = require('../../passport')

const config = require('../../../config/config')
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: config.smtp,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
    	user: config.emailUser,
    	pass: config.emailPass
    }
})



router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/login'
	})
)

// this route is just used to get the user basic info
router.get('/user', (req, res, next) => {
	console.log('===== user!!======')
	console.log(req.user)
	if (req.user) {
		return res.status(200).json({ user: req.user })
	} else {
		return res.status(404).json({ user: null })
	}
})

router.post('/prevalidate', (req, res, next) => {
	console.log('req.body: ',req.body)
	const { id } = req.body
	User.findById( id , (findErr, findResponse) => {
		if(findErr){
			console.log('get validate: findeErr')
			return res.status(404)
		}
		console.log('get prevalidate response: ', findResponse)
		let checkActive = findResponse.active
		console.log('checkActive: ', checkActive)
		if(checkActive===true){
			console.log('return status 201 ')
			return res.status(201)
		}
		console.log('return status 200 ')
		return res.status(200).json(findResponse.local.username)			
/* 		if(idMatch.active!=undefined){
			if(idMatch.active){
				return res.status(200).json({ user: idMatch })
			}else{
				return res.status(401).json({ msg: 'user not active', username: idMatch.local.username })
			}
		}else{ */
		/* } */
	})
})

router.post('/validate', (req, res) => {
	const { id } = req.body
	User.findByIdAndUpdate(id, { active: true },(finderror, findres) =>{
		if(finderror){
			return res.status(500).json({error: finderror})
		}
		return res.status(200).json(findres)
	})
})

router.post('/d2l2t2', (req, res) => {
	const { id } = req.body
	User.findByIdAndDelete(id,(findDelerror, findDelres) =>{
		if(findDelerror){
			return res.status(500).json({error: findDelerror})
		}
		return res.status(200).json(findDelres)
	})
})

router.post(
	'/login',
	function(req, res, next) {
		console.log(req.body)
		console.log('================')
		next()
	},
	passport.authenticate('local'),
	(req, res) => {
		console.log('POST to /login')
		const user = JSON.parse(JSON.stringify(req.user)) // hack
		const cleanUser = Object.assign({}, user)
		if (cleanUser.local) {
			delete cleanUser.local.password
			if(cleanUser.active!=undefined){
				if(cleanUser.active){
					return res.status(200).json({ user: cleanUser })
				}else{
					return res.status(401).json({ error: 'usuario inactivo, revise su correo para validar la cuenta.'})
				}
			}else{
				return res.status(401).json({ user: cleanUser, error: 'active: udnefined...'})
			}
		}else{
			res.status(404).json({ user: null })
		}
	}
)

router.post('/logout', (req, res) => {
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid') // clean up!
		return res.status(200).json({ msg: 'logging you out' })
	} else {
		return res.status(202).json({ msg: 'no user to log out!' })
	}
})

router.post('/signup', (req, res) => {
	const { email, username, password } = req.body
	// ADD VALIDATION
	User.findOne({ 'local.username': username }, (err, userMatch) => {
		if (userMatch) {
			return res.status(202).json({
				error: `Ya existe alguien con este nombre: ${username}`
			})
		}else{
			User.findOne({ 'email': email }, (err, emailMatch) => {
				if (emailMatch) {
					return res.status(202).json({
						error: `Ya existe alguien con este correo: ${email}`
					})
				}else{
					
							const newUser = new User({
								'email': email,
								'local.username': username,
								'local.password': password
							})
							newUser.save((err, savedUser) => {
								if (err) {
									return res.status(500).json({error: 'no se pudo registrar el usuario: '+err})
								}
								console.log(savedUser)
								//mail de validacion:
								let message = {
									from: "admin@freewaves.live",
									to: email,
									subject: "Completa el registro de freewaves.live !",
									text: `${username}! Gracias por registrarte en freewaves.live. Entra a la siguiente pagina (${config.paginaValidacion}) y pega este codigo: ${savedUser._id}`,
									html: `<h3>Hola ${username}!</h3>
									<hr>
									<p>Gracias por registrarte en Freewaves.live. <br>
									Entra a el siguiente link (<a href='${config.paginaValidacion}/${savedUser._id}' alt='validacion freewaves'>Valida tu cuenta</a>)
									</p><br>
									<img src='https://beta.freewaves.live/assets/img/Logo.png' width="228px" height="40px"/>`
								}
								transporter.sendMail(message, function(rr, info){
									if(rr){
										return res.status(200).json({error: 'Usuario registrado pero fallo el mail de validacion, comunicase con el administrador: err:'+rr})
									}else{
										console.log(info)
										return res.status(200).json(savedUser)
									}
								})
							})
				}
			})
		}
	})
})



module.exports = router
