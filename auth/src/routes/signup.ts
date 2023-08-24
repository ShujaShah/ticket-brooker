import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

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
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error('Invalid Email or Password');
    }
    const { email, password } = req.body;
    console.log('creating a user....');
    throw new Error('Error connecting to the database...');
    res.send({});
  }
);

export { router as signupRouter };
