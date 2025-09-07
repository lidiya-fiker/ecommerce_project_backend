import { IsInt, Min, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderProductDto } from 'src/orderProduct.module.ts/dto/orderProduct.dto';

export class CreateOrderDto {
  @IsInt()
  orderTimeMs: number; // timestamp in ms

  @IsInt()
  @Min(0)
  totalCostCents: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  products: OrderProductDto[];
}
