import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { comparePassword } from '@/common/helpers/util';
import { Repository } from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async handleRegister(createAuthDto: CreateAuthDto) {
    return this.usersService.create(createAuthDto);
  }

  // async handleLogin(loginAuthDto: LoginAuthDto) {
  //   const { email, password } = loginAuthDto;
  //   const user = await this.validateUser(email, password);
  //   return user;
  // }

  // private async validateUser(email: string, password: string) {
  //   const user = await this.userRepository.findOneBy({ email });
  //   if (!user) {
  //     throw new BadRequestException('User not found');
  //   }
  //   const isPasswordValid = await comparePassword(password, user.password);
  //   if (!isPasswordValid) {
  //     throw new BadRequestException('Invalid password');
  //   }
  //   return user;
  // }
}
