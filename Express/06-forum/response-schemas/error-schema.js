class ErrorResponse {
  constructor(message, status = 400) {
    this.message = message;
    this.status = status;
  }
}

class NotFoundErrorResponse extends ErrorResponse {
  constructor(message) {
    super(message, 404);
    // Si on utilise pas extends
    // this.message = message,
    // this.errors = null,
    // this.status = 404;
  }
}

class InvalidFieldErrorResponse extends ErrorResponse {
  constructor(message, fieldErrors, status = 422) {
    super(message, status);
    this.fieldErrors = fieldErrors;
  }
}

// to  : validator-middleware
module.exports = {
  ErrorResponse,
  NotFoundErrorResponse,
  InvalidFieldErrorResponse,
};
