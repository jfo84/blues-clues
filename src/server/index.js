'use strict';

/** Module dependencies. */
require('dotenv').config()

const express      = require('express');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const path         = require('path');
const logger       = require('morgan');
const cors         = require('cors');
const routes       = require('./routes');

const port = process.env.PORT || 3000;

// Configure the express server
const app = express();

// If we're developing, use webpack middleware for module hot reloading
if (process.env.NODE_ENV !== 'production') {
  console.log('==> 🌎 using webpack');

  // Load and configure webpack
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../node_modules/react-scripts/config/webpack.config.dev');

  // Setup middleware
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.set('port', port);
app.use(logger('dev'))
  .use(cors())
  .use(cookieParser())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(express.static(path.resolve(__dirname, '../public')))
  .use('/', routes);

// Start her up, boys
app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});