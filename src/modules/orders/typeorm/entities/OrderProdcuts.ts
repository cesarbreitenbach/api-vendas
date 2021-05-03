import Product from '@modules/products/typeorm/entities/Product';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Order from './order';

@Entity('order_products')
export default class OrderProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, order => order.orderProducts)
  @JoinColumn({ name: 'id_order' })
  order: Order;

  @ManyToOne(() => Product, product => product.orderProducts)
  @JoinColumn({ name: 'id_product' })
  product: Product;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
