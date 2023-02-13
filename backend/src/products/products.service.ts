import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CategoriesService } from '../categories/categories.service';
import { PaginationDto } from '../common/dto';
import { CreateProductDto, PaginatedProducts, UpdateProductDto } from './dto';
import { ProductChangeHistory } from './entities/product-change-history.entity';
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

    @InjectRepository(ProductChangeHistory)
    private readonly productChangeRepository: Repository<ProductChangeHistory>,

    private readonly categoriesService: CategoriesService,

    // query runner
    private readonly dataSource: DataSource,
  ) {}

  // TODO: user relation
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

      delete productMeasurements.product;
      delete stockInquiry.product;

      product.productMeasurements = [productMeasurements];
      product.stockInquiries = [stockInquiry];

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

  async update(id: number, updateProductDto: UpdateProductDto) {
    const {
      measurementUnitId,
      quantityId,
      quantity,
      category_id,
      unit,
      ...rest
    } = updateProductDto;
    const product = await this.findOne(id.toString());
    let updatedProduct = await this.productRepository.preload({
      id,
      ...rest,
    });

    // Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (category_id) {
        const category = await this.categoriesService.findOne(category_id);
        updatedProduct.category = category;
      }

      if (measurementUnitId && unit) {
        const measurementUnit = await this.updateMeasurementUnit(
          measurementUnitId,
          unit,
        );
        updatedProduct.productMeasurements = [measurementUnit];
      }

      if (quantityId && quantity) {
        const stockInquiry = await this.updateStockInquiry(
          quantityId,
          quantity,
        );
        updatedProduct.stockInquiries = [stockInquiry];
      }

      // create history
      const changeHistory = await this.createChangeHistory(
        product,
        JSON.parse(JSON.stringify(updatedProduct)),
      );

      // thanks to the catch you don't need manager.save()
      updatedProduct = await this.productRepository.save(updatedProduct);
      await queryRunner.commitTransaction();

      updatedProduct.changeHistory = [changeHistory];

      return updatedProduct;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
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

  private async updateMeasurementUnit(id: number, unit: string) {
    const measurementUnit = await this.productMeasurementRepository.preload({
      id,
      unit,
    });
    if (!measurementUnit) {
      throw new NotFoundException(`Measurement unit with id ${id} not found`);
    }

    return await this.productMeasurementRepository.save(measurementUnit);
  }

  private async updateStockInquiry(
    id: number,
    quantity: number,
  ): Promise<StockInquiry> {
    const stockInquiry = await this.stockInquiryRepository.preload({
      id,
      quantity,
    });
    if (!stockInquiry)
      throw new NotFoundException(`Stock Inquiry with id: '${id}' not found`);

    return await this.stockInquiryRepository.save(stockInquiry);
  }

  private async createChangeHistory(
    product: Product,
    updatedProduct: Product,
  ): Promise<ProductChangeHistory> {
    delete product.changeHistory;

    let changeHistory = this.productChangeRepository.create({
      description: `Product '${product.title}' was edited ${JSON.stringify(
        product,
      )}  --->  ${JSON.stringify(updatedProduct)}`,
      product,
    });
    changeHistory = await this.productChangeRepository.save(changeHistory);
    delete changeHistory.product;

    return changeHistory;
  }
}
