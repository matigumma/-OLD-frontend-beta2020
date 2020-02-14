const express = require('express')
const router = express.Router()
//const User = require('../../../models/User')
const User = require('../../models/User')
const passport = require('../../passport')

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
		if (cleanUser.local) {
			delete cleanUser.local.password
			res.status(200).json({ user: cleanUser })
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
	const { username, password } = req.body
	// ADD VALIDATION
	User.findOne({ 'local.username': username }, (err, userMatch) => {
		if (userMatch) {
			return res.status(202).json({
				error: `Ya existe alguien con este nombre: ${username}`
			})
		}
		const newUser = new User({
			'local.username': username,
			'local.password': password
		})
		newUser.save((err, savedUser) => {
			if (err) return res.status(400).json({error: err})
			console.log(savedUser)
			return res.status(200).json(savedUser)
		})
	})
})

module.exports = router
