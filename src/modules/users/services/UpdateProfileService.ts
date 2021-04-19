import AppError from 'src/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export default class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Usuario não encontrado');
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('esse email já pertenc a um usuario');
    }

    if (password && !old_password) {
      throw new AppError('digite a senha antiga!');
    }

    if (password && old_password) {
      const checkOldPass = await compare(old_password, user.password);

      if (!checkOldPass) {
        throw new AppError('Senha invalida!');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    return user;
  }
}
