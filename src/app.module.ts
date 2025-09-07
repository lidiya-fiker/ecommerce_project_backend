import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { orderModule } from './order/order.module';
import { orderProductModule } from './orderProduct.module.ts/orderProduct.module';
import { DeliveryOptionModule } from './deliveryOption/deliveryOption.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'kidiya',
      database: 'ecommerce',
      synchronize: true,
      autoLoadEntities: true,
    }),
    ProductModule,
    CartModule,
    orderModule,
    orderProductModule,
    DeliveryOptionModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
