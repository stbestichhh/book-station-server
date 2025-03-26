import {
  BookCreationAttributes,
  BookStatus,
  BookStatusEnum,
} from '../../database';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateBookDto implements BookCreationAttributes {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  author!: string;

  @IsNumber()
  @IsNotEmpty()
  pages!: number;

  @IsString()
  @IsOptional()
  description?: string | undefined;

  @IsUrl()
  @IsOptional()
  image?: string | undefined;

  @IsString()
  @IsOptional()
  @IsEnum(BookStatusEnum)
  status?: BookStatus;

  @IsNumber()
  @IsOptional()
  pagesRead?: number | undefined;

  @IsNumber()
  @IsOptional()
  minutesSpent?: number | undefined;
}
