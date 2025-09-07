import { IsUUID, IsInt, Min } from 'class-validator';

export class OrderProductDto {
  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsInt()
  @Min(0)
  estimatedDeliveryTimeMs: number;
}
