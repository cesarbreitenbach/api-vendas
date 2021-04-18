import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UsersTokenRepository from '../typeorm/repositories/UsersTokenRepository';
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UsersTokenRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Usuario/Token invalido.');
    }

    const user = await userRepository.findById(userToken.id);

    if (!user) {
      throw new AppError('Usuario/Token invalido');
    }

    const compare = addHours(user.created_at, 2);

    if (isAfter(Date.now(), compare)) {
      throw new AppError('Token expirou!');
    }

    user.password = await hash(password, 8);

    await userRepository.save(user);
  }
}
