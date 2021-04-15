import 'reflect-metadata';
import express, { NextFunction, Request, response, Response } from 'express';
import cors from 'cors';
import routes from '../routes';
import AppError from '../errors/AppError';
import '../typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((error: Error, req: Request, resp: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(666, () => {
  console.log('Running on port 666 ©️');
});
