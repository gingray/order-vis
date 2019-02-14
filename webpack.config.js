const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
        { test: /\.hbs$/, loader: "handlebars-loader" },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css' ,
        chunkFilename: '[id].css',
      }),
        new HtmlWebpackPlugin({
            hash: true,
            template: './index.html',
            path: path.join(__dirname, "../dist/"),
            filename: 'index.html',
            inject: false
        }),

    ]
};
