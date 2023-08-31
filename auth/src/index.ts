import mongoose from 'mongoose';
import app from './app';

// app.all('*', async (req, res, next) => {
//   throw new NotFoundError();
// });

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined...');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to the Database...😄');
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log('Listening on Port 3000!');
  });
};

start();
