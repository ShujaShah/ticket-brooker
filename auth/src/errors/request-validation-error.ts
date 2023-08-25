import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super();

    // To extend a build in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
