import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto, UpdateUserDto } from './dto';
import { WhereOptions } from 'sequelize';
import { UserEntity } from '../../database';
import { v7 as uuidv7 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public getUserById(userId: string) {
    return this.usersRepository.findByPk(userId);
  }

  public getUser(options: WhereOptions<UserEntity>) {
    return this.usersRepository.findOne(options);
  }

  public getAllUsers(options?: WhereOptions<UserEntity>) {
    return this.usersRepository.findAll(options);
  }

  public async createUser(dto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt);

    return this.usersRepository.create({
      ...dto,
      id: uuidv7(),
      password: hash,
    });
  }

  public updateUser(userId: string, dto: UpdateUserDto) {
    return this.usersRepository.update(userId, dto);
  }

  public deleteUser(userId: string) {
    return this.usersRepository.delete(userId);
  }
}
