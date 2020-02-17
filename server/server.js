const express = require('express');
const historyApiFallback = require('connect-history-api-fallback');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const cors = require('cors');
//const proxy = require('http-proxy-middleware');
//const config = require('../config/config');
const isDev = process.env.NODE_ENV !== 'production';
const webpackConfig = require('../webpack.config');
const port  = process.env.PORT || 8080;

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport')
const dbConnection = require('../config/db') // loads our connection to the mongo database
const app = express();
// Configuration
// ================================================================================================
app.use(cors());
app.use(express.urlencoded({ extended: true }));//false?
app.use(express.json());
//session:
app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

// API routes
//require('./routes')(app);
app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));
//app.use(proxy('/media', { target: 'http://localhost:3000', changeOrigin: true } ));

if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(historyApiFallback({
    verbose: false
  }));

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(__dirname, '../client/public'),
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../build')));
} else {
  app.use(express.static(path.resolve(__dirname, '../build')));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
    res.end();
  });
}

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port);
});

module.exports = app;
