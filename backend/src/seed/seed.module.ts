import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';

import { CategoriesModule } from '../categories/categories.module';
import { ProductsModule } from '../products/products.module';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService],

  imports: [UsersModule, CategoriesModule, ProductsModule],
})
export class SeedModule {}
