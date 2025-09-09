import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from 'src/cart/entity/cartItem.entity';
import { DeliveryOption } from 'src/deliveryOption/entity/deliveryOption.entity';
import { Product } from 'src/product/entity/product.entity';
import { paymetnSummaryController } from './controller/payment.controller';
import { paymentSummaryService } from './service/paymetnSummery.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Product, DeliveryOption])],
  controllers: [paymetnSummaryController],
  providers: [paymentSummaryService],
})
export class paymentSummaryModule {}
