import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Payload } from '../payload';
import e from 'express';

export const CurrentUser = createParamDecorator(
  (data: keyof Payload, context: ExecutionContext) => {
    const request: e.Request = context.switchToHttp().getRequest();
    const user: Payload = request.user as Payload;
    return data ? user[data] : user;
  },
);
