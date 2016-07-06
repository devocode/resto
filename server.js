var path = require('path');
var webpack = require('webpack');
var express = require('express');

var config = require('./webpack.config.dev.js');

var compiler = webpack(config);
var app = express();
var publicPath = express.static(path.join(__dirname, 'public'));
var port = (process.env.PORT || 4000);

// Run dev server
if(process.env.NODE_EV !== 'production'){
  app.use(require('webpack-hot-middleware')(compiler));

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
}

// Setup a public path reference
app.use('/public', publicPath);

// Set up single-page app routing
app.get('*', function(req, res){
  res.sedFile(path.join(__dirnam, 'index.html'));
});

app.listen(port);

console.log(`I am listening to you through http://localhost:${port}...`);
