import { IsOptional, Min } from 'class-validator';

import { pagination } from '../utils/app-constants.utils';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  limit?: number = pagination.limit;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number = pagination.offset;
}
