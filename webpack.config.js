const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
    devServer: {
        contentBase: './dist'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
          },
        },
        {
          test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.(scss)$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader', // translates CSS into CommonJS modules
              }, {
                loader: 'postcss-loader', // Run post css actions
                options: {
                  plugins() {
                    // post css plugins, can be exported to postcss.config.js
                    return [
                      precss,
                      autoprefixer
                    ];
                  }
                }
              }, {
                loader: 'sass-loader' // compiles SASS to CSS
              }
            ]
          })
        }
      ]
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
        new HtmlWebpackPlugin({
            hash: true,
            template: './index.html',
            path: path.join(__dirname, "../dist/"),
            filename: 'index.html',
            inject: false
        }),

    ]
};