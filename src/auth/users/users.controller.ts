import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { WhereOptions } from 'sequelize';
import { UsersService } from './users.service';
import { UserEntity } from '../../database';
import { CreateUserDto, UpdateUserDto } from './dto';
import { JwtGuard } from '../guards';
import { Private } from '../decorators';

@UseGuards(ThrottlerGuard, JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Private()
  public async getAllUsers(@Query() options?: WhereOptions<UserEntity>) {
    return await this.userService.getAllUsers(options);
  }

  @Get(':userId')
  public async getUserById(@Param('userId') userId: string) {
    return await this.userService.getUserById(userId);
  }

  @Post()
  @Private()
  @HttpCode(HttpStatus.CREATED)
  public async createNewUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  @Private()
  @Patch(':userId')
  public async updateUserByID(
    @Param('userId') userId: string,
    @Body() dto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(userId, dto);
  }

  @Private()
  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteUserById(@Param('userId') userId: string) {
    return await this.userService.deleteUser(userId);
  }
}
