import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log('Something went wrong💥', err);
  res.status(400).send({
    message: 'Something went wrong💥',
  });
};

export default errorHandler;
