import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateCartItemDto } from '../dto/createCartItem.dto';
import { CartItemService } from '../service/cartItem.service';

@Controller('cart-items')
export class CartItemController {
  constructor(private readonly service: CartItemService) {}

  @Post()
  create(@Body() dto: CreateCartItemDto) {
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

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() dto: UpdateCartItemDto) {
  //     return this.service.update(id, dto);
  //   }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
