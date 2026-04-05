import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashPassword } from '@/common/helpers/util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { fullName, email, password, phone, role, status } = createUserDto;
    const userExists = await this.userRepository.findOneBy({ email });
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await hashPassword(password);

    const user = this.userRepository.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      role,
      status,
    });
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(email: string) {
    return await this.userRepository.delete({ email });
  }
}
