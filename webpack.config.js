
// TODO: implement production setting that will uglify
var watch = process.env.NODE_ENV == "watch";
var webpack = require('webpack');

module.exports = {
  watch: watch ? true : false,
  context: __dirname,
  devtool: "inline-sourcemap",
  entry: "./rest/dev/js/scripts.js",
  output: {
    path: __dirname + "/rest/build/js",
    filename: "scripts.min.js"
  }
};
