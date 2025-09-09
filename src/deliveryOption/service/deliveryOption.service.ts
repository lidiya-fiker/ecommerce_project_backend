import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryOption } from '../entity/deliveryOption.entity';
import { CreateDeliveryOptionDto } from '../dto/createDeliveryOption.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class DeliveryOptionService {
  constructor(
    @InjectRepository(DeliveryOption)
    private repo: Repository<DeliveryOption>,
  ) {}

  create(dto: CreateDeliveryOptionDto) {
    return this.repo.save(dto);
  }

  async findAll(expand?: string) {
    const options = await this.repo.find();
    if (expand === 'estimatedDeliveryTime') {
      return options.map((opt) => ({
        ...opt,
        estimatedDeliveryTime: dayjs().add(opt.deliveryDays, 'day').valueOf(),
      }));
    }
    return options;
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
