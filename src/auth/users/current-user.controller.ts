import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { JwtGuard } from '../guards';
import { UsersService } from './users.service';
import { CurrentUser } from '../decorators';
import { UpdateUserDto } from './dto';

@UseGuards(ThrottlerGuard, JwtGuard)
@Controller('user/me')
export class CurrentUserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  public async getCurrentUser(@CurrentUser('sub') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Patch()
  public async updateCurrentUser(
    @CurrentUser('sub') userId: string,
    dto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, dto);
  }
}
