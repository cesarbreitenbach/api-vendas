import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class ProfileController {
  public async show(req: Request, resp: Response): Promise<Response> {
    const profileService = new ShowProfileService();
    const user_id = req.user.id;
    const user = await profileService.execute({ user_id });
    return resp.json(user);
  }

  public async update(req: Request, resp: Response): Promise<Response> {
    const { name, email, password, old_password } = req.body;
    const user_id = req.user.id;
    const updateService = new UpdateProfileService();
    const user = await updateService.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return resp.json(user);
  }
}
