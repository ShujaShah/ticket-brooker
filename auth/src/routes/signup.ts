import express, { Request, Response } from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.get('/api/users', (req, res) => {
  res.send('it is working');
});

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 Characters'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    //Check if the user is already registered?
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Email already in use !');
    }
    //Save the user, we have already created the build function in schema
    const user = User.build({
      email,
      password,
    });
    await user.save();

    //Generate a JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      'asdf'
    );

    //Store the jwt on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
