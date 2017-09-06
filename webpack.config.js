const path = require('path')
const Visualizer = require('webpack-visualizer-plugin')
const { HotModuleReplacementPlugin } = require('webpack')

module.exports = [
  {
    name: 'client',
    target: 'web',
    entry: process.env.NODE_ENV === 'production' ? './client/index.tsx' : [
      'webpack-hot-middleware/client?path=/dist',
      'react-hot-loader/patch',
      './client/index.tsx'
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
      hotUpdateChunkFilename: 'hot/hot-update.js',
      hotUpdateMainFilename: 'hot/hot-update.json',
      filename: 'client.bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          use: ['react-hot-loader/webpack', 'awesome-typescript-loader']
        }
      ]
    },
    devtool: 'source-maps',
    externals: {
      history: 'History',
      react: 'React',
      redux: 'Redux',
      superagent: 'superagent',
      winjs: 'WinJS',
      'prop-types': 'PropTypes',
      'react-dom': 'ReactDOM',
      'react-redux': 'ReactRedux',
      'react-router': 'ReactRouter',
      'react-router-redux': 'ReactRouterRedux',
      'react-winjs': 'ReactWinJS',
      'redux-thunk': 'window.ReduxThunk'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [new HotModuleReplacementPlugin()]
  },
  {
    name: 'server',
    target: 'node',
    entry: ['./server/index.ts'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'server.bundle.js',
      libraryTarget: 'commonjs'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          use: ['awesome-typescript-loader']
        }
      ]
    },
    devtool: 'source-maps',
    devServer: {
      publicPath: '/dist/'
    },
    externals: /^[a-z0-9\-\/]+$/,
    plugins: [new Visualizer()],
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    }
  }
]
