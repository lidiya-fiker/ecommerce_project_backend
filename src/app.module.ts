import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';

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
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
