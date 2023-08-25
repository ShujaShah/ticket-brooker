import { ErrorRequestHandler } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  if (err instanceof DatabaseConnectionError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  res.status(400).send({
    errors: [
      {
        message: 'Something went Wrong 💥💥💥',
      },
    ],
  });
};

export default errorHandler;
