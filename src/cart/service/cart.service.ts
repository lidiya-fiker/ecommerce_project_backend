import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entity/cart.entity';
import { CreateCartDto } from '../dto/creareCart.dto';
import { CartItem } from '../entity/cartItem.entity';

@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart) private repo: Repository<Cart>) {}

  async create(dto: CreateCartDto) {
    const cart = this.repo.create(); // creates a Cart entity instance

    // Use Repository.create for each CartItem
    cart.items = dto.items.map((item) =>
      this.repo.manager.getRepository(CartItem).create({
        product: { id: item.productId },
        quantity: item.quantity,
        deliveryOption: { id: item.deliveryOptionId },
      }),
    );

    return this.repo.save(cart); // TypeORM handles the cascade insert
  }

  findAll() {
    return this.repo.find({
      relations: ['items', 'items.product', 'items.deliveryOption'],
    });
  }

  findOne(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ['items', 'items.product', 'items.deliveryOption'],
    });
  }
}
