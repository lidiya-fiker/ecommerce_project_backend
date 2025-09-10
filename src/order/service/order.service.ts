import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { OrderProduct } from 'src/orderProduct.module.ts/entity/orderProduct.entity';
import { CreateOrderDto } from '../dto/createOrder.dto';
import { DeliveryOption } from 'src/deliveryOption/entity/deliveryOption.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepo: Repository<OrderProduct>,
    @InjectRepository(DeliveryOption)
    private deliveryOptionRepo: Repository<DeliveryOption>,
  ) {}

  async create(dto: CreateOrderDto) {
    const products = [];

    for (const p of dto.products) {
      // 1. Find delivery option for this product (you may need to adjust based on schema)
      const deliveryOption = await this.deliveryOptionRepo.findOneBy({
        id: p.deliveryOptionId, // make sure your DTO includes this field
      });

      if (!deliveryOption) {
        throw new Error(`Delivery option not found for product ${p.productId}`);
      }

      // 2. Calculate estimatedDeliveryTimeMs
      const estimatedDeliveryTimeMs = dayjs()
        .add(deliveryOption.deliveryDays, 'day')
        .valueOf();

      // 3. Create order-product relation
      const orderProduct = this.orderProductRepo.create({
        product: { id: p.productId },
        quantity: p.quantity,
        estimatedDeliveryTimeMs,
      });

      products.push(orderProduct);
    }

    // 4. Create the order
    const order = this.orderRepo.create({
      orderTimeMs: dto.orderTimeMs,
      totalCostCents: dto.totalCostCents,
      products,
    });

    return this.orderRepo.save(order);
  }
  findAll(expand?: string) {
    return this.orderRepo
      .find({
        relations: ['products', 'products.product'],
      })
      .then((orders) =>
        orders.map((order) => ({
          id: order.id,
          orderTimeMs: order.orderTimeMs,
          totalCostCents: order.totalCostCents,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          products: order.products.map((p) => ({
            productId: p.product.id, // <-- always include productId
            quantity: p.quantity,
            estimatedDeliveryTimeMs: p.estimatedDeliveryTimeMs,
            product:
              expand === 'products'
                ? {
                    id: p.product.id,
                    name: p.product.name,
                    image: p.product.image,
                    stars: p.product.rating?.stars,
                    count: p.product.rating?.count,
                    priceCents: p.product.priceCents,
                    keywords: p.product.keywords,
                  }
                : undefined, // or remove the product field if not expanded
          })),
        })),
      );
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
