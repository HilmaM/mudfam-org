<<<<<<< HEAD
var HtmlWebpackPlugin = require('html-webpack-plugin')
=======
/*WebPack Config*/
var HtmlWebpackPlugin = require('html-webpack-plugin');
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
const path = require('path');

module.exports = {
  mode: 'development',
<<<<<<< HEAD
  entry: {
    index: './src/index.jsx',
=======
  devtool: false,
  entry: {
    index: './src/index.jsx'
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
<<<<<<< HEAD
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
=======
    path: path.resolve(__dirname, '/'),
  },
  optimization : {
    splitChunks : {
      chunks: 'all'
    }
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
<<<<<<< HEAD
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader'
=======
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: "file-loader"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=image/svg+xml"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
<<<<<<< HEAD
      '@': path.resolve(__dirname, 'src/'),
      FroalaEditor: 'file_name'
=======
      '@': path.resolve(__dirname, 'src/')
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
<<<<<<< HEAD
    }),
=======
    })
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
  ],
  devServer: {
    historyApiFallback: true
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: 'https://mudfam-server.herokuapp.com/'
    })
  }
}
