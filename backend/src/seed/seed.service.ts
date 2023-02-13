import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DataSource, Repository } from 'typeorm';

import { Category } from '../categories/entities/category.entity';
import { ProductsService } from '../products/products.service';
import { User } from '../users/entities/user.entity';
import { SEED_CATEGORIES, SEED_PRODUCTS, SEED_USERS } from './seed/seed-data';

@Injectable()
export class SeedService {
  private isProd: boolean;

  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    private readonly productsService: ProductsService,
  ) {
    this.isProd =
      configService.get<string>('stage') === 'prod' &&
      configService.get<string>('nodeEnv') === 'prod';
  }

  async executeSeed() {
    if (this.isProd) throw new UnauthorizedException('Cannot run SEED in Prod');

    await this.deleteData();

    const [user] = await this.insertUsers();
    await this.insertCategories();
    await this.insertProucts(user);
  }

  private async deleteData() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const allTables = [
      'category',
      'product_change_history',
      'product_measurement',
      'products',
      'stock_inquiry',
      'users',
    ];
    const promisesArr = [];

    await queryRunner.startTransaction();

    try {
      allTables.forEach(async (tableName) => {
        promisesArr.push(
          queryRunner.query(`TRUNCATE TABLE ${tableName} CASCADE`),
        );
        promisesArr.push(
          queryRunner.query(
            `ALTER SEQUENCE ${tableName}_id_seq RESTART WITH 1`,
          ),
        );
      });

      await Promise.all(promisesArr);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async insertUsers(): Promise<User[]> {
    const users: User[] = [];

    SEED_USERS.forEach((user) => {
      user.password = bcrypt.hashSync(user.password, 10);

      users.push(this.userRepository.create(user));
    });

    return await this.userRepository.save(users);
  }

  private async insertCategories(): Promise<Category[]> {
    const categories: Category[] = [];

    SEED_CATEGORIES.forEach((cat) =>
      categories.push(this.categoryRepository.create(cat)),
    );

    return await this.categoryRepository.save(categories);
  }

  private async insertProucts(user: User) {
    const insertPromises = [];

    SEED_PRODUCTS.forEach((product) =>
      insertPromises.push(this.productsService.create(product, user)),
    );

    await Promise.all(insertPromises);

    return true;
  }
}
