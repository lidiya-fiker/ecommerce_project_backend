import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class RatingDto {
  @IsNumber()
  stars: number;

  @IsNumber()
  count: number;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @Type(() => RatingDto)
  rating: RatingDto;

  @IsNumber()
  priceCents: number;

  @IsArray()
  @IsString({ each: true })
  keywords: string[];
}
