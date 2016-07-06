// Path is used for working with files and directory paths and is a native NodeJS module (doesn't require separate import)
var path = require('path');

// Webpack is the tool that is going to compile the code and make it usable in development and production.
var webpack = require('webpack');

// Let's make this usable in other files by exporting the webpack.
module.exports = {
  // This is going to serve for debugging our JS.
  devtool: 'source-map',

  // This section asks "where do you want to start to compile from" and take an array of two items:
  entry: [
    'webpack-hot-middleware/client',
    './src/app'
  ],

  // This section is used to configure what your app will do after the initial files are found in the "entry" section above.
  output: {
    // First, tell where you would like to bundle your JS files after they are packaged.
    // Using the path variable, we will say where it is going to be saved. The "__dirname" basically says, save to the directory
    // that the process is being run in.
    path: path.join(__dirname, 'public'),

    // Next, what would you like the compiled file to be called?
    filename: 'app.bundle.js',

    // Finally, what is the public path going to be?
    publicPath: '/public/'
  },

  // Plugins are extensions to the Webpack.
  plugins: [

    // This plugin allows you to change, add or remove modules from an app without a page reload (called "Hot Reloading")
    new webpack.HotModuleReplacementPlugin(),

    // When there are errors, this plugin will find the files with errors, skip them, and not kick you out of the build.
    new webpack.NoErrorsPlugin()
  ],

  // Modules allow you perfom operations within the build process, like convert ES6 to ES5 or use SCSS, Stylus, Less, etc.
  module: {
    loaders: [

      // Javascript loader to convert JSX and ES6 to browser-renderable Javascript
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },

      // Compile Stylus to CSS
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!stylus-loader',
        include: path.join(__dirname, 'src')
      }
    ]
  }
};
