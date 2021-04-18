import { compare, hash } from 'bcryptjs';
import AppError from 'src/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { sign } from 'jsonwebtoken';
import Auth from '@config/Auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário/Senha invalidos', 401);
    }

    const confirmPass = await compare(password, user.password);

    if (!confirmPass) {
      throw new AppError('Usuário/Senha invalidos', 401);
    }

    const token = sign({}, Auth.jwt.secret, {
      subject: user.id,
      expiresIn: Auth.jwt.expiresIn,
    });

    const resp: IResponse = { user, token };

    return resp;
  }
}

export default CreateSessionService;
