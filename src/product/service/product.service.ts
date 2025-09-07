import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productRepository.save(createProductDto);
  }

  async get() {
    return await this.productRepository.find();
  }
}
