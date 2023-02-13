import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoriesService } from '../categories/categories.service';
import { PaginationDto } from '../common/dto';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductMeasurement } from './entities/product-measurement.entity';
import { Product } from './entities/product.entity';
import { StockInquiry } from './entities/stock-inquiries.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductMeasurement)
    private readonly productMeasurementRepository: Repository<ProductMeasurement>,

    @InjectRepository(StockInquiry)
    private readonly stockInquiryRepository: Repository<StockInquiry>,

    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { category_id, unit, quantity } = createProductDto;

    const category = await this.categoriesService.findOne(category_id);

    try {
      const product = this.productRepository.create({
        ...createProductDto,
        category,
      });
      await this.productRepository.save(product);

      const productMeasurements = this.productMeasurementRepository.create({
        product,
        unit,
      });

      const stockInquiry = this.stockInquiryRepository.create({
        quantity,
        product,
      });

      await Promise.all([
        this.productMeasurementRepository.save(productMeasurements),
        this.stockInquiryRepository.save(stockInquiry),
      ]);

      return product;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail.replace('Key ', ''));

    if (error.code === 'err-001') throw new NotFoundException(error.detail);

    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}
