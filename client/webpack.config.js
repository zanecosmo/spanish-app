const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './index.tsx',
  mode: "development",
  target: "web",
  devServer: {
      port: 5000,
      static: {
          directory: path.join(__dirname, "public")
      },
      open: true,
      hot: true,
      liveReload: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html")
      })
  ]
};