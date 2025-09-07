import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entity/cart.entity';
import { CartController } from './controller/cart.controller';
import { CartService } from './service/cart.service';
import { Product } from 'src/product/entity/product.entity';
import { CartItem } from './entity/cartItem.entity';
import { DeliveryOption } from 'src/deliveryOption/entity/deliveryOption.entity';
import { CartItemService } from './service/cartItem.service';
import { CartItemController } from './controller/cartItem.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Product, CartItem, DeliveryOption]),
  ],
  controllers: [CartController, CartItemController],
  providers: [CartService, CartItemService],
})
export class CartModule {}
