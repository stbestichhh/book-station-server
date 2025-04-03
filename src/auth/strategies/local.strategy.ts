import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  public async validate(email: string, password: string) {
    const user = await this.usersService.getUser({ email });
    const pwMatch = await bcrypt.compare(password, user.password);

    if (!pwMatch) {
      throw new UnauthorizedException('Credentials are incorrect');
    }

    return user;
  }
}
