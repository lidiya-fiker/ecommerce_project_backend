import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from 'src/product/entity/product.entity';
import { DeliveryOption } from 'src/deliveryOption/entity/deliveryOption.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.cartItems, { eager: true })
  product: Product;

  @Column('int')
  quantity: number;

  @ManyToOne(
    () => DeliveryOption,
    (deliveryOption) => deliveryOption.cartItems,
    { eager: true },
  )
  deliveryOption: DeliveryOption;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
