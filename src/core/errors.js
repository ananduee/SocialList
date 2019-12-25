class AppError extends Error {
  constructor(name, message, captureTrace = false) {
    this.name = name;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function newError(code, message) {
  return new AppError(code, message, false);
}
