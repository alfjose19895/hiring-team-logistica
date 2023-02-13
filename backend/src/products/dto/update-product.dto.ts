import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsNumber()
  @Min(1)
  @IsOptional()
  measurementUnitId?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  quantityId?: number;

  @IsBoolean()
  @IsOptional()
  hasStock?: boolean;
}
