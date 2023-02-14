import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],

  imports: [TypeOrmModule.forFeature([Category]), AuthModule],

  exports: [TypeOrmModule, CategoriesService],
})
export class CategoriesModule {}
