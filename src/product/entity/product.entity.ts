import { CartItem } from 'src/cart/entity/cartItem.entity';
import { OrderProduct } from 'src/orderProduct.module.ts/entity/orderProduct.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

class Rating {
  @Column('float')
  stars: number;

  @Column('int')
  count: number;
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column(() => Rating)
  rating: Rating;

  @Column('int')
  priceCents: number;

  @Column('text', { array: true })
  keywords: string[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: OrderProduct[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
