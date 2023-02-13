import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from '../../categories/entities/category.entity';
import { ProductMeasurement } from './product-measurement.entity';
import { StockInquiry } from './stock-inquiries.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  code: string;

  @Column('bool', { default: true })
  hasStock: boolean;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(
    () => ProductMeasurement,
    (productMeasurement) => productMeasurement.product,
  )
  productMeasurements: ProductMeasurement[];

  @OneToMany(() => StockInquiry, (stockInquiry) => stockInquiry.product)
  stockInquiries: StockInquiry[];

  // changeHistory
}
