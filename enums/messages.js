const { statusCode } = require('./constants');
const apiMessages = {
  API_INTERNAL_ERROR: { message: 'Internal Server Error.', messageCode: 1001 },
  API_NOT_FOUND: { message: 'API not found.', messageCode: 1002 },
  API_UNAUTHORIZED: {
    message: 'Unauthorized.',
    messageCode: 1003,
    status: 401
  },
  API_PERMISSION_DENIED: { message: 'Permission denied.', messageCode: 1004 },
  SOMETHING_WRONG: {
    message: 'Something wrong, please try again.',
    messageCode: 1005
  },
  BAD_REQUEST: {
    message: 'Parameters are invalid.',
    messageCode: 1006,
    status: statusCode.BAD_REQUEST
  }
};

module.exports = { apiMessages };
