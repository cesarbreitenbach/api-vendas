import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, response, Response } from 'express';
import cors from 'cors';
import routes from '../routes';
import { errors } from 'celebrate';
import AppError from '../errors/AppError';
import '../typeorm';
import upload from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(upload.directory));
app.use(routes);
app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(666, () => {
  console.log('Running on port 666 ©️');
});
