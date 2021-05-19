import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Customer from '@modules/cutomers/typeorm/entities/Customer';
import OrderProducts from './OrderProducts';

@Entity('orders')
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'id_customer' })
  customer: Customer;

  @OneToMany(() => OrderProducts, orderProducts => orderProducts.order, {
    cascade: true,
  })
  orderProducts: OrderProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
