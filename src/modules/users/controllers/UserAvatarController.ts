import { request, Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(req: Request, resp: Response): Promise<Response> {
    const updateAvt = new UpdateUserAvatarService();

    const user = updateAvt.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    return resp.json(user);
  }
}
