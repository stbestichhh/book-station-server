import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Payload } from '../payload';

export const CurrentUser = createParamDecorator(
  (data: keyof Payload, context: ExecutionContext) => {
    const user: Payload = context.switchToHttp().getRequest().user;
    return data ? user[data] : user;
  },
);
