import AppError from 'src/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  name: string;
  email: string;
}

export default class CreateCostumerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const emailExists = await customerRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('Email já existe!');
    }

    const customer = customerRepository.create({
      name,
      email,
    });
    await customerRepository.save(customer);

    return customer;
  }
}
