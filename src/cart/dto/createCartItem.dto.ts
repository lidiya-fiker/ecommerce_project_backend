import { IsUUID, IsInt, Min, IsString } from 'class-validator';

export class CreateCartItemDto {
  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsString()
  deliveryOptionId: string;
}
