import * as path from 'path';
import * as webpack from 'webpack';

const ContextReplacementPlugin = webpack.ContextReplacementPlugin;
const DefinePlugin = webpack.DefinePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  devtool: 'source-map',

  context: path.resolve(__dirname, '../'),

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [ path.resolve(__dirname, '../node_modules') ]
  },

  entry: {
    client: './src/client'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: ''
  },

  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.ts$/,
        exclude: [/\.(spec|e2e|d)\.ts$/],
        use: ['ts-loader']
      },
      {
        test: /\.html/,
        use: ['html-loader']
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },

  plugins: [
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      path.resolve('./src'),
      {}
    ),

    new HtmlWebpackPlugin({
      chunksSortMode: 'auto',
      filename: 'index.html',
      hash: true,
      inject: 'body',
      template: './src/index.html'
    })
  ],

  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  },

  devServer: {
    contentBase: './src',
    historyApiFallback: true,
    host: 'localhost',
    port: 5000,
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false
    }
  }
};