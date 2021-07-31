const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

// ==================== private ===============================================

const pad = num => `${num > 9 ? '' : '0'}${num}`;

const genAccessLogFileName = (time, index) => {
  if (!time) return 'access.log';

  const year = time.getFullYear();
  const month = pad(time.getMonth() + 1);
  const day = pad(time.getDate());

  return `${year}${month}/${year}${month}${day}-${index}-access.log`;
};

const apiLogDir = path.join(__dirname, 'log/api');
const accessLogDir = path.join(__dirname, 'log/access');
// ensure log directory exists
fs.existsSync(apiLogDir) || fs.mkdirSync(apiLogDir, { recursive: true });
fs.existsSync(accessLogDir) || fs.mkdirSync(accessLogDir, { recursive: true });

/**
 * @function getConfigAccessLog
 * @description base on morgan options
 */
const getConfigAccessLog = () => {

  const options = {
    size: '25M',
    interval: '1d',
    compress: 'gzip',
    path: accessLogDir
  };

  return { stream: rfs(genAccessLogFileName, options) };
};

const apiLogFileTransport = new transports.DailyRotateFile({
  filename: `${apiLogDir}/%DATE%-api.log`,
  datePattern: 'YYYYMMDD',
  zippedArchive: true,
  maxSize: '20m'
});

/** @TODO Test */
const apiLogger = createLogger({
  level: 'info',
  // exceptionHandlers: true,
  exitOnError: false,
  format: format.combine(
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    apiLogFileTransport
  ]
});

module.exports = {
  getConfigAccessLog,
  apiLogger,
};
