import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Color } from '@/modules/colors/entities/color.entity';
import { Size } from '@/modules/sizes/entities/size.entity';

@Entity('product_variants')
@Unique(['product_id', 'color_id', 'size_id'])
export class ProductVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_id' })
  product_id: string;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'color_id' })
  color_id: string;

  @ManyToOne(() => Color)
  @JoinColumn({ name: 'color_id' })
  color: Color;

  @Column({ name: 'size_id' })
  size_id: string;

  @ManyToOne(() => Size)
  @JoinColumn({ name: 'size_id' })
  size: Size;

  @Column({ type: 'varchar', length: 80, unique: true })
  sku: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  price: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  compare_at_price: number | null;

  @Column({ type: 'int', default: 0 })
  stock_quantity: number;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
