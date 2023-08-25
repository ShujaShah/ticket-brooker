import { ErrorRequestHandler } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof RequestValidationError) {
    const formattedErrors = err.errors.map((error) => {
      if (error.type === 'field') {
        return { message: error.msg, field: error.path };
      }
    });
    return res.status(400).send({ errors: formattedErrors });
  }
  if (err instanceof DatabaseConnectionError) {
    console.log('handling this error as db connection error');
  }
  res.status(400).send({
    message: 'Something went wrong💥',
  });
};

export default errorHandler;
