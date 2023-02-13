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
import { CreateProductDto, PaginatedProducts, UpdateProductDto } from './dto';
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

  async findAll(paginationDto: PaginationDto): Promise<PaginatedProducts> {
    const { limit, offset } = paginationDto;

    const [products, count] = await Promise.all([
      this.productRepository.find({
        take: limit,
        skip: offset,
      }),
      this.productRepository.count({}),
    ]);

    return { count, products };
  }

  async findOne(term: string): Promise<Product> {
    let product: Product;
    if (isFinite(+term))
      product = await this.productRepository.findOneBy({ id: +term });
    else {
      const queryBuilder = this.productRepository.createQueryBuilder('product');

      product = await queryBuilder
        .where('UPPER(title) =:title or code =:code', {
          title: term.toUpperCase(),
          code: term.toLowerCase(),
        })
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.productMeasurements', 'productMeasurements')
        .leftJoinAndSelect('product.stockInquiries', 'stockInquiries')
        .getOne();
    }

    if (!product)
      throw new NotFoundException(`Product with '${term}' not found`);

    return product;
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
