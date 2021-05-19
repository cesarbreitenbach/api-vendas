import CustomerRepository from '@modules/cutomers/typeorm/repositories/CustomerRepository';
import ProductRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from 'src/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrderRepository from '../typeorm/repositories/OrderRepository';
import Customer from '@modules/cutomers/typeorm/entities/Customer';

interface IProducts {
  id: string;
  quantity: number;
  price: number;
}

interface IRequest {
  customer: Customer;
  products: IProducts[];
}

class CreateOrderService {
  public async execute({ customer, products }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository);
    const productsRepository = getCustomRepository(ProductRepository);
    const customerRepository = getCustomRepository(CustomerRepository);

    const customerExists = customerRepository.findById(customer.id);

    if (!customerExists) {
      throw new AppError('Cliente não existe');
    }

    const productsExists = await productsRepository.findAllByIds(products);

    if (!productsExists.length) {
      throw new AppError('Não existem produtos disponiveis');
    }

    const existsProductsIds = productsExists.map(p => p.id);

    const missingProducts = products.filter(
      p => !existsProductsIds.includes(p.id),
    );

    if (missingProducts.length) {
      throw new AppError(`Não encontrei o produto ${missingProducts[0].id}`);
    }

    const verifyQuantity = products.filter(
      p =>
        productsExists.filter(prod => prod.id === p.id)[0].quantity <
        p.quantity,
    );

    if (verifyQuantity.length) {
      throw new AppError(
        `Não tenho quantidade de ${verifyQuantity[0].quantity} para ${verifyQuantity[0].id}`,
      );
    }

    const serializedProducts = products.map(p => ({
      product_id: p.id,
      quantity: p.quantity,
      price: productsExists.filter(prod => prod.id === p.id)[0].price,
    }));

    const order = await orderRepository.createOrder({
      customer,
      products: serializedProducts,
    });

    return orderRepository.create(order);
  }
}

export default CreateOrderService;
