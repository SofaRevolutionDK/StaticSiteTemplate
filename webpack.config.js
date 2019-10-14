const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {

  entry: './src/js/app.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: './dist'
  },

  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          // Apply rule for .sass, .scss or .css files
          test: /\.(sa|sc|c)ss$/,

          // Set loaders to transform files.
          // Loaders are applying from right to left(!)
          // The first loader will be applied after others
          use: [
                  {
                   // extract to single bundles file
                   loader: MiniCssExtractPlugin.loader
                 },
                 {
                   // This loader resolves url() and @imports inside CSS
                   loader: "css-loader"
                 },
                 {
                   // Then we apply postCSS fixes like autoprefixer and minifying
                   loader: "postcss-loader"
                 },
                 {
                   // First we transform SASS to standard CSS
                   loader: "sass-loader",
                   options: {
                     implementation: require("sass")
                   }
                 }
               ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
                 {
                   // Using file-loader for these files
                   loader: "file-loader",

                   options: {
                     outputPath: 'img'
                   }
                 }
               ]
        }
    ]
  },

  plugins: [

    new MiniCssExtractPlugin({
      filename: "bundle.css"
    })

  ],

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle. For now we don't need production's JavaScript
  // minifying and other thing so let's set mode to development
  mode: 'development'
};
