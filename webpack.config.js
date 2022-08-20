const path = require('path');

module.exports = {
  entry: './src/js/scripts.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
};