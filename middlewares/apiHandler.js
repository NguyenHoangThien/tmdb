const { statusCode } = require('../enums').constants;
const { apiMessages } = require('../enums').messages;
const { APIResponse } = require('../models').app;

/**
 * @function logAPI
 * @example
 */
const logAPI = (req, resData) => {
  const current = new Date();
  try {
    const result = {};
    const { method, url, params = {}, body = {}, user = {}, startTime } = req;
    // delete if body has field password
    if (body.password) body.password = '**********';

    result.request = { method, url, user, params, body };
    result.response = getLogResponse(resData);
    result.responseTime = !startTime ? null : (current.getTime() - startTime);

    console.log(current.toISOString(), JSON.stringify(result));

    if (resData instanceof Error) {
      console.log(current.toISOString(), resData);
    }

  } catch (err) {
    const message = `Can not log API, ${err.toString()}`;
    const tmp = JSON.stringify({ message, error: err });
    console.log(current.toISOString(), tmp);
  }
};

const getLogResponse = (resData) => {
  if (!resData) {
    return {
      status: statusCode.INTERNAL_SERVER_ERROR,
      ...apiMessages.API_INTERNAL_ERROR
    };
  }

  if (resData instanceof APIResponse) {
    return resData.toLog();
  }

  if (resData instanceof Error) {
    return {
      error: resData,
      status: statusCode.INTERNAL_SERVER_ERROR,
      ...apiMessages.API_INTERNAL_ERROR
    };
  }

  return { status: statusCode.SUCCESS };
}

/**
 * @function uncatchableAPI [Middleware]
 * @description catch not found api
 */
const uncatchableAPI = (req, res, next) => {
  const error = new APIResponse();
  error
    .setStatus(statusCode.NOT_FOUND)
    .setMessage(apiMessages.API_NOT_FOUND)

  next(error);
}

/**
 * @function responseHandler [Middleware]
 * @description handle response for each API
 *  if data is [APIResponse], response status will base on data status
 *  if data is [Error], response status is 500 and message: 'Server Error'
 *  if data is [object], response status is 200
 */
const responseHandler = (data, req, res, next) => {
  const status = statusCode.INTERNAL_SERVER_ERROR;
  try {
    if (!data || data instanceof Error) {
      return res.status(status).json(apiMessages.API_INTERNAL_ERROR);
    }

    if (data instanceof APIResponse) {
      return res.status(data.status).json(data.get());
    }

    return res.status(statusCode.SUCCESS).json(data);

  } catch (err) {
    return res.status(status).json(apiMessages.API_INTERNAL_ERROR);
  } finally {
    logAPI(req, data);
  }
};

module.exports = {
  uncatchableAPI,
  responseHandler,
};