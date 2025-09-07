import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { CreateProductDto } from '../dto/createProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  async get() {
    return await this.productService.get();
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }
}
