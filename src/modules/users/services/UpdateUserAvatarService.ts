import AppError from 'src/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User não encontrado.');
    }

    if (user.avatar) {
      const userAvatarFilepath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilepath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilepath);
      }
    }
    user.avatar = avatarFilename;
    await usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
