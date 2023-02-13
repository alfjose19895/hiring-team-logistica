import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @IsOptional()
  code?: string;

  @IsBoolean()
  @IsOptional()
  hasStock?: boolean;
}
