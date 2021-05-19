import { EntityRepository, In, Repository } from 'typeorm';
import Order from '../entities/Order';
import Customer from '@modules/cutomers/typeorm/entities/Customer';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

@EntityRepository(Order)
export default class OrderRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.findOne({
      where: { id },
      relations: ['orderProducts', 'customer'],
    });

    return order;
  }

  public async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      orderProducts: products,
    });

    await this.save(order);

    return order;
  }
}
