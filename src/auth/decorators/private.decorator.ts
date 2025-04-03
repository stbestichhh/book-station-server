import { SetMetadata } from '@nestjs/common';

export const PRIVATE_ROUTE_KEY = 'PRIVATE';
export const Private = () => SetMetadata(PRIVATE_ROUTE_KEY, true);
