const path = require('path');
const webpack = require('webpack');

const AggressiveMergingPlugin = webpack.optimize.AggressiveMergingPlugin;
const OccurrenceOrderPlugin = webpack.optimize.OccurrenceOrderPlugin;

module.exports = {
  target: 'node',

  context: path.resolve(__dirname, '../'),

  entry: {
    'api/users/index': './src/api/users',
  },

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, '../node_modules')]
  },

  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs',
    path: path.resolve('./.webpack')
  },

  externals: [
    'aws-sdk'
  ],

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ],
  },

  plugins: [
    // Assign the module and chunk ids by occurrence count
    new OccurrenceOrderPlugin(),

    // Chunk merging strategy
    new AggressiveMergingPlugin()
  ]
};