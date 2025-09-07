import { ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCartItemDto } from './createCartItem.dto';

export class CreateCartDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCartItemDto)
  items: CreateCartItemDto[];
}
