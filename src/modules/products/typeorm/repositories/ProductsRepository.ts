import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

interface IProducts {
  id: string;
  quantity: number;
}

@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findAllByIds(products: IProducts[]): Promise<Product[]> {
    const productsIds = products.map(p => p.id);

    const produtosExistentes = await this.find({
      where: In(productsIds),
    });
    return produtosExistentes;
  }
}
