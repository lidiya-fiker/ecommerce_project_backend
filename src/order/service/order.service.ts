import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { OrderProduct } from 'src/orderProduct.module.ts/entity/orderProduct.entity';
import { CreateOrderDto } from '../dto/createOrder.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepo: Repository<OrderProduct>,
  ) {}

  async create(dto: CreateOrderDto) {
    const order = this.orderRepo.create({
      orderTimeMs: dto.orderTimeMs,
      totalCostCents: dto.totalCostCents,
      products: dto.products.map((p) =>
        this.orderProductRepo.create({
          product: { id: p.productId },
          quantity: p.quantity,
        }),
      ),
    });
    return this.orderRepo.save(order);
  }

  findAll() {
    return this.orderRepo.find({
      relations: ['products', 'products.product'],
    });
  }

  findOne(id: string) {
    return this.orderRepo.findOne({
      where: { id },
      relations: ['products', 'products.product'],
    });
  }

  remove(id: string) {
    return this.orderRepo.delete(id);
  }
}
