// Copy this file as config.js in the same folder, with the proper database connection URI.
//db: 'mongodb://username:password@url:port/db',
/* 
module.exports = {
  db: 'mongodb://mongo:27017/freewaves',
  db_dev: 'mongodb://mongo:27017/freewaves',
  secret: 'y45rs2c4r2t4k2n',
  expiresInToken: 604800
}; */
module.exports = {
  db: 'mongodb://mongofront:27017/freewaves',
  db_dev: 'mongodb://mongofront:27017/freewaves',
  secret: 'y45rs2c4r2t4k2n',
  expiresInToken: 604800,
  emailUser: 'admin@freewaves.live',
  emailPass: 'qq2DR*B1vW',
  smtp: 'c1540122.ferozo.com',
  paginaValidacion: 'https://beta.freewaves.live/validation'
};