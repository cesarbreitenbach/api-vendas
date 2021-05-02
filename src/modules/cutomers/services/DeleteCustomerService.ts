import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
}

export default class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const repo = getCustomRepository(CustomerRepository);

    const customer = await repo.findOne(id);

    if (!customer) {
      throw new AppError('Não existe usuario!');
    }

    await repo.remove(customer);
  }
}
