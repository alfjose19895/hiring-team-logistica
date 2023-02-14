import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './../categories/entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const category = this.categoryRepository.create(createCategoryDto);

      return await this.categoryRepository.save(category);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll() {
    return await this.categoryRepository.find({});
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category)
      throw new NotFoundException(`Category with id: '${id}' not found`);

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.preload({
      ...updateCategoryDto,
      id,
    });
    if (!category)
      throw new NotFoundException(`Category with id '${id} not found`);

    return await this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);

    await this.categoryRepository.remove(category);
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException([
        error.detail.replace(/Key|[\(\)\=]/g, '').trim(),
      ]);

    if (error.code === 'err-001') throw new NotFoundException([error.detail]);

    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}
