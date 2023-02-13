import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductMeasurement } from './entities/product-measurement.entity';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],

  imports: [TypeOrmModule.forFeature([Product, ProductMeasurement])],
})
export class ProductsModule {}
