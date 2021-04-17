import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';

class UsersController {
  public async index(req: Request, resp: Response): Promise<Response> {
    const listUser = new ListUserService();
    const users = await listUser.execute();
    return resp.json(users);
  }

  public async create(req: Request, resp: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return resp.json(user);
  }
}

export default UsersController;
