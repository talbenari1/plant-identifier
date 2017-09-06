/**
 * The API and file server for the app.
 */

import { json, raw } from 'body-parser'
import * as express from 'express'
import * as helmet from 'helmet'
import { Server } from 'http'
import * as morgan from 'morgan'
import * as logger from 'winston'
import api from './api'
import html from './html'

// create the express server
const app: express.Application = express()

// define the port (to be used later)
app.set('port', process.env.PORT || 3000)

// add security-based HTTP headers
app.use(helmet())

// parse raw binary request bodies
app.use(raw({ limit: '10mb' }))

// parse JSON request bodies
app.use(json())

// log all requests to the console
app.use(morgan('dev'))

// integrate webpack development middleware
if (process.env.NODE_ENV === 'development') {
  logger.info('Integrating hot loader bindings...')
  /* tslint:disable no-var-requires */
  const config = require('../webpack.config')[0]
  const compiler = (require('webpack'))(config)
  
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: '/dist'
  }))

  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/dist'
  }))
  /* tslint:enable no-var-requires */
}

// bind the API calls to the app
api(app)

// define asset folders
app.use('/', express.static('./dist'))
app.use('/favicon', express.static('./favicon'))

// create a listener for all other incoming calls to get the client app
app.get('/', (req, res) => {
  const context: RouterContext = {}
  const markup = html(req.url, context)
  context.url ? res.redirect(301, context.url) : res.send(markup)
})

// start the server
const server: Server = app.listen(app.get('port'), () => {
  logger.info(`Listening on port ${server.address().port}`)
})
