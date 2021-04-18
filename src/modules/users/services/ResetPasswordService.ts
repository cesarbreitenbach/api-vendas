import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UsersTokenRepository from '../typeorm/repositories/UsersTokenRepository';
import { hash } from 'bcryptjs';
import { isAfter, addHours, parseISO } from 'date-fns';

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
      throw new AppError('Não encontrei token para esse usuario.');
    }

    const user = await userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('Usuario/Token invalido');
    }

    const createdAt = userToken.created_at;

    const compareDate = addHours(createdAt, 2);

    console.log(compareDate, '  - ', Date.now());

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirou!');
    }

    user.password = await hash(password, 8);

    await userRepository.save(user);
  }
}
