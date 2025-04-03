import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PRIVATE_ROUTE_KEY } from '../decorators';
import * as process from 'node:process';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly reflectror: Reflector) {
    super();
  }

  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPrivate = this.reflectror.getAllAndOverride<boolean>(
      PRIVATE_ROUTE_KEY,
      [context.getClass(), context.getHandler()],
    );

    if (isPrivate && process.env.NODE_ENV !== 'development') {
      throw new ForbiddenException('This route is forbidden to access');
    }

    return super.canActivate(context);
  }
}
