import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductVariant)
    private readonly variantRepository: Repository<ProductVariant>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { variants, ...productData } = createProductDto;
    const product = this.productRepository.create(productData);
    const savedProduct = await this.productRepository.save(product);

    if (variants && variants.length > 0) {
      const productVariants = variants.map((variant) =>
        this.variantRepository.create({
          ...variant,
          product_id: savedProduct.id,
        }),
      );
      await this.variantRepository.save(productVariants);
    }

    return this.findOne(savedProduct.id);
  }

  async findAll(query: QueryProductDto): Promise<{
    data: Product[];
    meta: {
      total: number;
      page: number;
      limit: number;
      lastPage: number;
    };
  }> {
    const {
      brandId,
      categoryId,
      colorId,
      sizeId,
      gender,
      search,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = query;

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .select([
        'product.id',
        'product.name',
        'product.description',
        'product.gender',
        'product.created_at',
      ])
      .leftJoin('product.brand', 'brand')
      .addSelect(['brand.id', 'brand.name'])
      .leftJoin('product.category', 'category')
      .addSelect(['category.id', 'category.name'])
      .leftJoin('product.variants', 'variant')
      .addSelect(['variant.id', 'variant.price'])
      .leftJoin('variant.color', 'color')
      .addSelect(['color.id', 'color.name', 'color.hex_code'])
      .leftJoin('variant.size', 'size')
      .addSelect(['size.id', 'size.value'])
      .leftJoin('product.images', 'image_rel')
      .addSelect(['image_rel.url', 'image_rel.is_primary'])
      .where('product.is_active = :isActive', { isActive: true });

    if (brandId) {
      queryBuilder.andWhere('product.brand_id = :brandId', { brandId });
    }

    if (categoryId) {
      queryBuilder.andWhere('product.category_id = :categoryId', {
        categoryId,
      });
    }

    if (gender) {
      queryBuilder.andWhere('product.gender = :gender', { gender });
    }

    if (search) {
      queryBuilder.andWhere(
        '(product.name ILIKE :search OR product.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Filter by variant properties (Color, Size, Price)
    if (colorId || sizeId || minPrice || maxPrice) {
      queryBuilder.innerJoin('product.variants', 'v_filter');

      if (colorId) {
        queryBuilder.andWhere('v_filter.color_id = :colorId', { colorId });
      }

      if (sizeId) {
        queryBuilder.andWhere('v_filter.size_id = :sizeId', { sizeId });
      }

      if (minPrice) {
        queryBuilder.andWhere('v_filter.price >= :minPrice', { minPrice });
      }

      if (maxPrice) {
        queryBuilder.andWhere('v_filter.price <= :maxPrice', { maxPrice });
      }
    }

    const skip = (page - 1) * limit;

    const [data, total] = await queryBuilder
      .orderBy('product.created_at', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: [
        'brand',
        'category',
        'variants',
        'variants.color',
        'variants.size',
      ],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    const { ...productData } = updateProductDto;

    Object.assign(product, productData);
    await this.productRepository.save(product);

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    product.is_active = false;
    await this.productRepository.save(product);
  }
}
