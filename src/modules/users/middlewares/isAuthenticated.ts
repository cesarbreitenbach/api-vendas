import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import Auth from '@config/Auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Não encontrei o token!');
  }
  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, Auth.jwt.secret);
    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (e) {
    throw new AppError('Token invalido');
  }
}
