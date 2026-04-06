import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  async create(createColorDto: CreateColorDto): Promise<Color> {
    const color = this.colorRepository.create(createColorDto);
    return await this.colorRepository.save(color);
  }

  async findAll(): Promise<Color[]> {
    return await this.colorRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Color> {
    const color = await this.colorRepository.findOneBy({ id });
    if (!color) {
      throw new NotFoundException(`Color with ID ${id} not found`);
    }
    return color;
  }

  async update(id: string, updateColorDto: UpdateColorDto): Promise<Color> {
    const color = await this.findOne(id);
    Object.assign(color, updateColorDto);
    return await this.colorRepository.save(color);
  }

  async remove(id: string): Promise<void> {
    const color = await this.findOne(id);
    await this.colorRepository.remove(color);
  }
}
