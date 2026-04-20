import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Size } from './entities/size.entity';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  async create(createSizeDto: CreateSizeDto): Promise<Size> {
    const size = this.sizeRepository.create(createSizeDto);
    return await this.sizeRepository.save(size);
  }

  async findAvailableSizes(): Promise<Size[]> {
    return await this.sizeRepository
      .createQueryBuilder('size')
      .innerJoin(
        'product_variants',
        'variant',
        // 'variant.size_id = size.id AND variant.stock_quantity > 0 AND variant.is_active = true',
        'variant.size_id = size.id AND variant.is_active = true',
      )
      .innerJoin(
        'products',
        'product',
        'product.id = variant.product_id AND product.is_active = true',
      )
      .orderBy('size.region', 'ASC')
      .addOrderBy('size.value', 'ASC')
      .distinct(true)
      .getMany();
  }

  async findOne(id: string): Promise<Size> {
    const size = await this.sizeRepository.findOneBy({ id });
    if (!size) {
      throw new NotFoundException(`Size with ID ${id} not found`);
    }
    return size;
  }

  async update(id: string, updateSizeDto: UpdateSizeDto): Promise<Size> {
    const size = await this.findOne(id);
    Object.assign(size, updateSizeDto);
    return await this.sizeRepository.save(size);
  }

  async remove(id: string): Promise<void> {
    const size = await this.findOne(id);
    await this.sizeRepository.remove(size);
  }
}
