import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionsService';

export default class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const sessionService = new CreateSessionService();
    const { email, password } = req.body;
    const user = await sessionService.execute({
      email,
      password,
    });

    return res.json(user);
  }
}
