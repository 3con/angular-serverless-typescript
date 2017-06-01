import * as path from 'path';
import * as webpack from 'webpack';
import * as nodeExternals from 'webpack-node-externals';

module.exports = {
  target: 'node',

  context: path.resolve(__dirname, '../'),

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [ path.resolve(__dirname, '../node_modules') ]
  },

  entry: {
    'server': './src/server'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/\.(spec|e2e|d)\.ts$/],
        use: ['ts-loader']
      }
    ]
  },

  externals: [nodeExternals()],

  node: {
    global: true,
    crypto: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  }
};