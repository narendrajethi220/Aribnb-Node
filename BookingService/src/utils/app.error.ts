export interface AppError extends Error {
  statusCode: number;
}

export class InternalServerError extends Error implements AppError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 500;
    this.name = "InternalServerErrror";

    Error.captureStackTrace(this, this.constructor);
  }
}

export class InvalidBodyRequest extends Error implements AppError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
    this.name = "InvalidBodyRequest";

    Error.captureStackTrace(this, this.constructor);
  }
}
