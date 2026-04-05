import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from '@/common/decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any) {
    return req.user;
  }

  @Get('profile')
  profile(@Request() req: any) {
    return req.user;
  }
}
