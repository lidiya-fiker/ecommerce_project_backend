import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CartService } from '../service/cart.service';
import { CreateCartDto } from '../dto/creareCart.dto';

@Controller('carts')
export class CartController {
  constructor(private service: CartService) {}

  @Post()
  create(@Body() dto: CreateCartDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
