import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '@modules/cutomers/typeorm/repositories/CustomerRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  email: string;
}
export default class UpdateCustomerService {
  public async execute({ id, email, name }: IRequest): Promise<Customer> {
    const customerRepo = getCustomRepository(CustomerRepository);

    const customer = await customerRepo.findById(id);

    if (!customer) {
      throw new AppError('Usuario não existe');
    }

    if (email) {
      const userUpdateEmail = await customerRepo.findByEmail(email);
      if (userUpdateEmail && userUpdateEmail.id !== id) {
        throw new AppError('esse email já pertence a outra pessoa.');
      }
      customer.email = email;
    }

    customer.name = name;

    return await customerRepo.save(customer);
  }
}
