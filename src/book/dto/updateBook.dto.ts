import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './createBook.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsNumber()
  @IsOptional()
  yearFinished?: number;
}
