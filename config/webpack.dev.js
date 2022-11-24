const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port : 5000,
    proxy: {'/':{target :'http://127.0.0.1:5000/',changeOrigin :true}},
    open: false,
    hot: true,
    compress: true,    
    historyApiFallback: true,
    liveReload: true,
  },
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 100000,
              name: "/public/asset/[name].[hash:8].[ext]",              
            }
          }
        ]
      }
    ],
  },
});