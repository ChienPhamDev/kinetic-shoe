import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductVariantDto {
  @IsUUID()
  @IsNotEmpty()
  color_id: string;

  @IsUUID()
  @IsNotEmpty()
  size_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  sku: string;

  @IsNotEmpty()
  price: number;

  @IsOptional()
  compare_at_price?: number;

  @IsOptional()
  stock_quantity?: number;
}

export class CreateProductDto {
  @IsUUID()
  @IsNotEmpty()
  brand_id: string;

  @IsUUID()
  @IsNotEmpty()
  category_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  slug: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['men', 'women', 'unisex', 'kids'])
  @IsNotEmpty()
  gender: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  @IsOptional()
  variants?: CreateProductVariantDto[];
}
