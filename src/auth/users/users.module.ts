import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { DatabaseFactoryModule, UserEntity } from '../../database';
import { UsersController } from './users.controller';
import { CurrentUserController } from './current-user.controller';

@Module({
  imports: [DatabaseFactoryModule.forFeature([UserEntity])],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController, CurrentUserController],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
