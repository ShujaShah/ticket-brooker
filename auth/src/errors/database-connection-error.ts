import { ValidationError } from 'express-validator';

export class DatabaseConnectionError extends Error {
  reason = 'Error Connecting to Database...';
  constructor() {
    super();

    // To extend a build in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
