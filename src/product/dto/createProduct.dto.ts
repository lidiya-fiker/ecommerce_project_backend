import { IsString, IsNotEmpty, IsArray, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  stars: number;

  @IsNumber()
  count: number;

  @IsNumber()
  priceCents: number;

  @IsArray()
  @IsString({ each: true })
  keywords: string[];
}
