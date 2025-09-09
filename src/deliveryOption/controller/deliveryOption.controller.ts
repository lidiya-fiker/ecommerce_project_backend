import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateDeliveryOptionDto } from '../dto/createDeliveryOption.dto';
import { DeliveryOptionService } from '../service/deliveryOption.service';

@Controller('deliveryOptions')
export class DeliveryOptionController {
  constructor(private readonly service: DeliveryOptionService) {}

  @Post()
  create(@Body() dto: CreateDeliveryOptionDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('expand') expand?: string) {
    return this.service.findAll(expand);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() dto: UpdateDeliveryOptionDto) {
  //     return this.service.update(id, dto);
  //   }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
