const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require("./models/sequelize");
const { getConfigAccessLog } = require('./logger');
const router = require('./routes');
const cronjobs = require('./cronjobs');
const env = process.env.NODE_ENV || 'development';
const { apiHandler } = require('./middlewares');
const serverConfig = {
  PORT: 8001,
  ACCESS_LOG: true
};

const app = express();
const server = http.createServer(app);

app.use(morgan('combined', getConfigAccessLog()));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.use(apiHandler.uncatchableAPI);
app.use(apiHandler.responseHandler);

// =============== server event functions =====================================
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('*** Environment:', env, '***')
  console.log('*** Listening on ', bind, '***');
};

const onError = error => {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof serverConfig.PORT === 'string' ?
    'Pipe ' + serverConfig.PORT : 'Port ' + serverConfig.PORT;

  switch (error.code) {
    case 'EACCES':
      console.log(bind, 'requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(bind, 'is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Server Listener
server.listen(serverConfig.PORT);
server.on('error', onError);
server.on('listening', onListening);

// Connect Database
db.sequelize.sync();

// Setup cronjobs
cronjobs.forEach(job => {
  job();
});