import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from './entity/orderProduct.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderProduct])],
  controllers: [],
  providers: [],
})
export class orderProductModule {}
