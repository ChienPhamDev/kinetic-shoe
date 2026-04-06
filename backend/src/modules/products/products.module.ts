import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { ProductImage } from './entities/product-image.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { BrandModule } from '@/modules/brand/brand.module';
import { CategoriesModule } from '@/modules/categories/categories.module';
import { ColorsModule } from '@/modules/colors/colors.module';
import { SizesModule } from '@/modules/sizes/sizes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductVariant, ProductImage]),
    BrandModule,
    CategoriesModule,
    ColorsModule,
    SizesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
