const { resolve } = require('path')

const HtmlPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin')

const isDev = !process.argv.join(' ').match(/prod(uction)?/)

console.log(`Mode: ${isDev ? 'development' : 'production'}`)

module.exports = {
  entry: './src/index.tsx',
  mode: isDev ? 'development' : 'production',
  target: ['web', 'es5'],
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'static/[contenthash:8].js',
    chunkFilename: 'static/chunk.[contenthash:8].js',
    publicPath: '/',
    sourceMapFilename: 'static/maps/[file].map',
    assetModuleFilename: 'static/res/[hash:12][ext][query]'
  },
  module: {
    rules: [
      // TS
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      },
      // Images
      {
        test: /\.(png|jpe?g|webp|gif|ico)$/,
        type: 'asset'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devServer: {
    port: 20914,
    contentBase: './build',
    historyApiFallback: true
  },
  experiments: {
    asset: true
  },
  plugins: [
    new CleanPlugin({
      cleanStaleWebpackAssets: false
    }),
    new HtmlPlugin({
      template: './src/template.html'
    }),
    new TsCheckerPlugin()
  ]
}
