import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './users/dto';
import { LocalGuard } from './guards';
import { Throttle } from '@nestjs/throttler';
import { CurrentUser } from './decorators';
import { UserEntity } from '../database';

@Throttle({ default: { limit: 3, ttl: 60000 } })
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  public async signup(@Body() dto: CreateUserDto) {
    return await this.authService.signup(dto);
  }

  @UseGuards(LocalGuard)
  @Post('signin')
  public async signin(@CurrentUser() user: UserEntity) {
    return await this.authService.signin(user);
  }
}
