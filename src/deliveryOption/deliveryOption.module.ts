import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entity/product.entity';
import { DeliveryOption } from 'src/deliveryOption/entity/deliveryOption.entity';
import { DeliveryOptionService } from './service/deliveryOption.service';
import { DeliveryOptionController } from './controller/deliveryOption.controller';
import { Cart } from 'src/cart/entity/cart.entity';
import { CartItem } from 'src/cart/entity/cartItem.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Product, CartItem, DeliveryOption]),
  ],
  controllers: [DeliveryOptionController],
  providers: [DeliveryOptionService],
})
export class DeliveryOptionModule {}
