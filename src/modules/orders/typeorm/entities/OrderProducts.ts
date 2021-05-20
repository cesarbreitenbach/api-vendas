import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Order from './Order';
import Product from '../../../products/typeorm/entities/Product';

@Entity('order_products')
export default class OrderProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, order => order.orderProducts)
  @JoinColumn({ name: 'id_order' })
  order: Order;

  @Column()
  id_order: string;

  @ManyToOne(() => Product, product => product.orderProducts)
  @JoinColumn({ name: 'id_product' })
  product: Product;

  @Column()
  id_product: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
