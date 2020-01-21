const jwt = require('jsonwebtoken')
const config = require('../../../config/config')
const User = require('../../models/User')

const { isAuthenticated } = require('../../../config/auth')

module.exports = (app) => {
// GET /user/list
// list all users
// Public
  app.get('/user/list', (req, res, next) => {
    User.find()
      .exec()
      .then((list) => res.json(list))
      .catch((err) => next(err))
  })

// POST /user/login body{ email, password }
// Try to validate user
// Public
  app.post('/user/login', function (req, res, next) {
    const { email, password } = req.body

    User.findOne({ email }, (err, usr)=>{
      if(err) throw err

      usr.comparePassword(password, (err, isMatch) => {
          if(err) throw err
          
          if(isMatch) {
              let token =  jwt.sign({ id: usr._id }, config.secret, { expiresIn: config.expiresInToken })
              res.status(200).json({ error: false, msg:'Login ok', token })
          }else{
              res.status(400).json({ error: true, msg:'Login fail' })
          }
      })

    })
  })

// POST /api/*
// Create a new item
// Must be private: add auth middleware
  app.post('/user/register', function (req, res, next) {
    const { name, email, password } = req.body

    let newUser = new User({
        name,
        email,
        password 
    })
    newUser.save()
        .then(usr => {
            console.log(result)
            let token =  jwt.sign({ id: usr._id }, config.secret, { expiresIn: config.expiresInToken })
            res.status(200).json({ error: false, msg: 'Register success', token });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: true, msg: 'Register fail' });
        })

  })


// PUT /user/:id
// update by id
// Must be private, add auth middleware
/*   app.put('/user/:id', (req, res, next) => {
//    User.findById(req.params.id)
    const data = req.body.data
    User.findByIdAndUpdate(req.params.id, data)
      .exec()
      .then((usr) => res.json(usr))
      .catch((err) => next(err));
  }); */

}
