const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode : "production",
  entry : './src/index.tsx',
  module :{
    rules :[
      {
        test : /\.(ts|tsx|js|jsx)$/,
        use : "babel-loader",
        exclude : /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1000000,
              name: "./public/asset/[name].[hash:8].[ext]",            
            }
          }
        ]
      }
    ],
  },
  plugins : [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
      favicon: './public/favicon.ico'
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
  output : {
    path : path.resolve(__dirname,"dist"),
    filename:"./src/index.bundle.js"
  },
  resolve :{
    alias: {
      "@": path.resolve(__dirname, "../src/"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
}