import { IsInt, Min } from 'class-validator';

export class CreateDeliveryOptionDto {
  @IsInt()
  @Min(1)
  deliveryDays: number;

  @IsInt()
  @Min(0)
  priceCents: number;
}
