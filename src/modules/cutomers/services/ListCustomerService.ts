import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

export default class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const repo = getCustomRepository(CustomerRepository);

    const customers = await repo.find();

    return customers;
  }
}
