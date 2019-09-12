/* global process, __dirname */
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Read environment variables from "testenv". Override environment vars if they are already set.
const TESTENV = path.resolve(__dirname, '../..', 'testenv');

if (fs.existsSync(TESTENV)) {
  const envConfig = dotenv.parse(fs.readFileSync(TESTENV));
  Object.keys(envConfig).forEach((k) => {
    process.env[k] = envConfig[k];
  });  
}

var webpack = require('webpack');
const ROOT_DIR = path.resolve(__dirname, '..', '..');
var PORT = process.env.PORT || 8080;

module.exports = {
  mode: 'development',
  resolve: {
    modules: [
      path.join(ROOT_DIR, 'packages'),
      'node_modules'
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin(['CLIENT_ID', 'ISSUER']),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: PORT,
  },
};
