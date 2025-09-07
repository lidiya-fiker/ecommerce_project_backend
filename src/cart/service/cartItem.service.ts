import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../entity/cartItem.entity';
import { CreateCartItemDto } from '../dto/createCartItem.dto';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private repo: Repository<CartItem>,
  ) {}

  create(dto: CreateCartItemDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find({ relations: ['product', 'deliveryOption'] });
  }

  findOne(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ['product', 'deliveryOption'],
    });
  }

  //   update(id: string, dto: UpdateCartItemDto) {
  //     return this.repo.update(id, dto);
  //   }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
