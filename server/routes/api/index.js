const express = require('express')
const app = express.Router()

const User = require('../../models/User'); 
const basicAuth = require('express-basic-auth')

var staticUserAuth = basicAuth({
  users: {
    'mati2620': 'fran2011'
  },
  challenge: false
})


  app.get('/regdeusuarios', staticUserAuth,  (req, res, next) => {
    User.find((finderror, findres) =>{
      console.log('regdeusuarios: ',findres)
      if(finderror){
        return res.status(500).json({error: finderror})
      }
      return res.status(200).json(findres)
    })
  });
/* 
  app.post('/api/counters', function (req, res, next) {
    const counter = new Counter();

    counter.save()
      .then(() => res.json(counter))
      .catch((err) => next(err));
  });

  app.delete('/api/counters/:id', function (req, res, next) {
    Counter.findOneAndDelete({ _id: req.params.id })
      .exec()
      .then((counter) => res.json())
      .catch((err) => next(err));
  });

  app.put('/api/counters/:id/increment', (req, res, next) => {
    Counter.findById(req.params.id)
      .exec()
      .then((counter) => {
        counter.count++;

        counter.save()
          .then(() => res.json(counter))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  app.put('/api/counters/:id/decrement', (req, res, next) => {
    Counter.findById(req.params.id)
      .exec()
      .then((counter) => {
        counter.count--;

        counter.save()
          .then(() => res.json(counter))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  }); */

module.exports = app
