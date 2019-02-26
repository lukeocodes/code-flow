const express = require('express')
const logger = require('morgan')
const debug = require('debug')('code-flow:server')
const http = require('http')
const path = require('path')

const app = express()
const port = process.env.PORT || '3001'

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

const messages = []

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))


app.get('/api/config', function(req, res) {
  res.json({ NEXMO_NUMBER: process.env.NEXMO_NUMBER })
})

app.get('/api', function(req, res) {
  res.json(messages)
})

app.post('/api', function(req, res) {
  messages.push(req.body)
  res.status(201).json(req.body)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'))
})

const server = http.createServer(app)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)