const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isProduction = process.argv.indexOf('-p') !== -1 // Check if we are in production mode

const BUILD_DIR = path.resolve(__dirname, 'dist')
const APP_DIR = path.resolve(__dirname, 'src')

module.exports = {
  entry: {
    'main': APP_DIR + '/index.js',
    'config': 'app.config',
    'locale': 'locale',
    'vendor': [
      'preact',
      'preact-compat',
      'react-router-dom',
      'preact-redux',
      'react-ink'
    ]
  },
  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader?modules=true&localIdentName=[name]__[local]',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/img/[name].[ext]?[hash]'
        }
      }
    ]
  },
  devtool: isProduction ? '' : 'source-map',
  devServer: {
    contentBase: APP_DIR,
    compress: true,
    historyApiFallback: true,
    stats: 'minimal',
    hot: true,
    inline: true,
    disableHostCheck: true // Hack for cloudflare warp purposes, the internet says it's not as secure but I'm Batman so I use it anyway
  },
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      'react-redux': 'preact-redux'
    },
    modules: [
      APP_DIR + '/assets/',
      APP_DIR + '/global-modules/',
      'node_modules'
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': isProduction ? JSON.stringify('production') : JSON.stringify('development')
      }
    }),
    isProduction ? new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|json|svg|png|jpeg)$/,
      minRatio: 0.8
    }) : new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({names: ['vendor', 'config', 'locale']}),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      template: APP_DIR + '/index.html'
    }),
    new CopyWebpackPlugin([
      { from: path.join(APP_DIR, 'assets', 'favicons'), to: path.join(BUILD_DIR, 'assets', 'favicons') },
      { from: path.join(APP_DIR, 'assets', 'css'), to: path.join(BUILD_DIR, 'assets', 'css') }
    ])

  ]
}
