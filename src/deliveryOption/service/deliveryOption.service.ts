import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryOption } from '../entity/deliveryOption.entity';
import { CreateDeliveryOptionDto } from '../dto/createDeliveryOption.dto';

@Injectable()
export class DeliveryOptionService {
  constructor(
    @InjectRepository(DeliveryOption)
    private repo: Repository<DeliveryOption>,
  ) {}

  create(dto: CreateDeliveryOptionDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  //   update(id: string, dto: UpdateDeliveryOptionDto) {
  //     return this.repo.update(id, dto);
  //   }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
