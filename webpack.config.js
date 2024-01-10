const path = require("path");

const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
module.exports = (env) => {
  return {
    plugins: [
      new Dotenv({
        path: `./.env${env.file ? `.${env.file}` : ""}`,
      }),
    ],
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "chatbot.js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".css"],
    },

    mode: "development",
    devServer: {
      static: {
        directory: path.join(__dirname, "build"),
      },

      // contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
    },
  };
};
