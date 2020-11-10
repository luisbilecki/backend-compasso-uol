const express = require('express')
require('express-async-errors')

const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

const defaultErrorHandler = require('./errors/handler')

const { isTest, isProduction } = require('./utils/env')

class App {
  constructor (port) {
    this.port = port
    this.server = express()

    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.server.use(helmet())

    const corsOptions = {
      origin: isProduction() ? process.env.FRONTEND_URL : '*',
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type'],
      credentials: true
    }

    this.server.use(cors(corsOptions))

    const morganFormat = isProduction() ? 'combined' : 'dev'

    if (!isTest()) {
      this.server.use(morgan(morganFormat))
    }

    this.server.use(express.json())
  }

  routes () {
    this.server.use('/cities', require('./routes/city'))
    this.server.use(defaultErrorHandler)
  }
}

module.exports = new App().server
