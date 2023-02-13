import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { Auth } from '../auth/decorators/auth.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { PaginationDto } from './../common/dto';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductsService } from './products.service';

@Controller('products')
@Auth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
    @GetUser('id') userId: number,
  ) {
    return this.productsService.findAll(paginationDto, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('id') userId: number) {
    return this.productsService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser('id') userId: number,
  ) {
    return this.productsService.update(+id, updateProductDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('id') userId: number) {
    return this.productsService.remove(+id, userId);
  }
}
