import { Injectable } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { comparePassword } from '@/common/helpers/util';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    return await this.usersService.create(createAuthDto);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const isPasswordValid = await comparePassword(pass, user.password);
      if (isPasswordValid) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }
}
