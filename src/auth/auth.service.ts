import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto';
import { UserEntity } from '../database';
import { Payload } from './payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  public async signup(dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  public async signin(user: UserEntity) {
    const payload: Payload = {
      sub: user.id,
      email: user.email,
    };

    return { authentication_token: await this.jwtService.signAsync(payload) };
  }
}
