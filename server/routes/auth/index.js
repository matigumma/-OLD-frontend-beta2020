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

router.get('/validate', (req, res, next) => {
	const { id } = req.body
	User.findOne({ '_id': id }, (err, idMatch) => {
		if(err){
			return res.status(404).json({ user: null })
		}
/* 		if(idMatch.active!=undefined){
			if(idMatch.active){
				return res.status(200).json({ user: idMatch })
			}else{
				return res.status(401).json({ msg: 'user not active', username: idMatch.local.username })
			}
		}else{ */
			return res.status(200).json({ user: idMatch })			
		/* } */
	})
})

router.post('/validate', (req, res) => {
	const { id } = req.body
	User.findByIdAndUpdate(id, { active: true},(error, res) =>{
		if(error){
			return res.status(500).json({error: error})
		}
		return res.status(200)
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
				return res.status(200).json({ user: cleanUser, error: 'active: udnefined...'})
			}
		}else{
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
				<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAAAoCAYAAADufVZCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDA2QzVBMzVBNzA5MTFFOUI0QjNCNzg1NkUwNkE1MEEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDA2QzVBMzZBNzA5MTFFOUI0QjNCNzg1NkUwNkE1MEEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEMDZDNUEzM0E3MDkxMUU5QjRCM0I3ODU2RTA2QTUwQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEMDZDNUEzNEE3MDkxMUU5QjRCM0I3ODU2RTA2QTUwQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pm48dmsAACOuSURBVHja7H0JnFxl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'/>`
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
	})
})



module.exports = router
