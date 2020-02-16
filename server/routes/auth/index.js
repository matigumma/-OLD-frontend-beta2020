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
		if (cleanUser.local && cleanUser.active) {
			delete cleanUser.local.password
			res.status(200).json({ user: cleanUser })
		}else{
			if(!cleanUser.active){
				return res.status(300).json({ error: 'usuario inactivo, revise su correo para validar la cuenta.'})
			}
			res.status(404).json({ user: null })
		}
	}
)

router.post('/logout', (req, res) => {
	console.log(req)
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
		}
		User.findOne({ 'email': email }, (err, emailMatch) => {
			if (emailMatch) {
				return res.status(202).json({
					error: `Ya existe alguien con este correo: ${email}`
				})
			}
		})
		const newUser = new User({
			'email': email,
			'local.username': username,
			'local.password': password
		})
		newUser.save((err, savedUser) => {
			if (err) return res.status(400).json({error: err})
			console.log(savedUser)
			//mail de validacion:
			let message = {
				from: "admin@freewaves.live",
				to: email,
				subject: "Completa el registro de freewaves.live !",
				text: `${username}! Gracias por registrarte en freewaves.live. Entra a la siguiente pagina (${config.paginaValidacion}) y pega este codigo: ${savedUser._id}`,
				html: `<h3>Hola ${username}!</h3>
				<hr>
				<p>Gracias por registrarte en Freewaves.live. 
				Entra a el siguiente link (<a href='${config.paginaValidacion}?code=${savedUser._id}' alt='validacion freewaves'>Valida tu cuenta</a>)
				</p>`
			}
			transporter.sendMail(message, function(rr, info){
				if(rr){
					return res.status(400).json({error: rr})
				}else{
					console.log(info)
				}
			})

			return res.status(200).json(savedUser)
		})
	})
})

router.post('/validate', (req, res) => {
	const { code } = req.body
	User.findOne({ '_id': code }, (er, match) => {
		if (match) {
			User.findByIdAndUpdate(code, { active: true})
			return res.status(200).json({
				msg: 'Validado correctamente'
			})
		}else{
			return res.status(400).json({error: `Nadie a quien validar: ${er}`})
		}
	})
})

module.exports = router
