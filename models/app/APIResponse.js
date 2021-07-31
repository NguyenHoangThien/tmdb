const { statusCode } = require('../../enums/constants');

class APIResponse {
  constructor({ content, messageCode, message, status } = {}) {
    if (message) this.message = message;
    if (messageCode) this.messageCode = messageCode;

    this.content = content || {};
    this.status = status || statusCode.SUCCESS;
  }

  update(content) {
    this.content = {
      ...this.content,
      ...content,
    }
    return this;
  }

  get() {
    const tmp = {};
    if (this.message) tmp.message = this.message;
    if (this.messageCode) tmp.messageCode = this.messageCode;
    return {
      ...tmp,
      ...this.content
    }
  }

  setStatus(status) {
    this.status = status;
    return this;
  }

  setMessage({ message = '', messageCode = 0 }) {
    this.message = message;
    this.messageCode = messageCode;
    return this;
  }

  toLog() {
    const tmp = { status: this.status };
    if (this.message) tmp.message = this.message;
    return tmp;
  };
};

module.exports = APIResponse;