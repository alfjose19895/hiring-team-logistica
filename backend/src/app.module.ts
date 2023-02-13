import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { EnvConfiguration } from './config/app.config';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],

      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,

      autoLoadEntities: true,
      synchronize: true,
    }),

    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    SeedModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
