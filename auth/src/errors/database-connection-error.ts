import { ValidationError } from 'express-validator';

export class DatabaseConnectionError extends Error {
  statusCode = 500;
  reason = 'Error Connecting to Database...';
  constructor() {
    super();

    // To extend a build in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
