// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

const config = {
  entry: "./src/index.js",
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devServer: {
    open: true,
    host: "localhost",
    static: {
      directory: path.join(__dirname, "build")
    },
    compress: true,
    port: 8080,
    client: {
      logging: 'info',
      overlay: {
        errors: true,
        warnings: false
      },
      progress: true,
      reconnect: 5,
      webSocketTransport: 'ws'
    },
    webSocketServer: 'ws',
    https: false,
    historyApiFallback: true,
    hot: 'only',
    open: true,
    proxy: {
      '/api': 'http://localhost:7180',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Mudfam Blog',
      template: "./src/index.html",
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(css|less)$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.(png|svg|jpdg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
    fallback: { "buffer": false }
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: /[\\/]node_modules[\\/]/,
        chunks: 'all'
      }
    }
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};
