import { CartItem } from 'src/cart/entity/cartItem.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('delivery_options')
export class DeliveryOption {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('int')
  deliveryDays: number;

  @Column('int')
  priceCents: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.deliveryOption)
  cartItems: CartItem[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
