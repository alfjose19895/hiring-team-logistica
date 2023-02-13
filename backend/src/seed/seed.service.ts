import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { SEED_CATEGORIES, SEED_USERS } from './seed/seed-data';

@Injectable()
export class SeedService {
  private isProd: boolean;

  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    this.isProd =
      configService.get<string>('stage') === 'prod' &&
      configService.get<string>('nodeEnv') === 'prod';
  }

  async executeSeed() {
    if (this.isProd) throw new UnauthorizedException('Cannot run SEED in Prod');

    await this.deleteData();

    const [user] = await this.insertUsers();
    const categories = await this.insertCategories();
  }

  private async deleteData() {
    // users
    await this.userRepository.createQueryBuilder().delete().where({}).execute();

    // categories
    await this.categoryRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
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

  private async insertProucts() {}
}
