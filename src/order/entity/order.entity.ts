import { OrderProduct } from 'src/orderProduct.module.ts/entity/orderProduct.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('bigint')
  orderTimeMs: number;

  @Column('int')
  totalCostCents: number;

  @OneToMany(() => OrderProduct, (op) => op.order, { cascade: true })
  products: OrderProduct[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
