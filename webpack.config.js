const path = require('path')
const EsmWebpackPlugin = require('@purtuga/esm-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    library: 'bison',
    libraryTarget: 'var',
    path: path.resolve(__dirname, 'dist/esm')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.ts/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new EsmWebpackPlugin()
  ]
}
