class ValidationError extends Error {
  constructor(message, messageCode) {
    super(message);
    this.name = 'ValidationError';
    this.message = messageCode;
  }

  get() {
    return {
      message: this.message,
      messageCode: this.messageCode,
    };
  }

  set({ message, messageCode }) {
    this.message = message;
    this.messageCode = messageCode;
    return this;
  }
};

module.exports = ValidationError;