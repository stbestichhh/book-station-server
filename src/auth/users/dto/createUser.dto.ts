import { UserCreationAttributes } from '../../../database';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto implements UserCreationAttributes {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password!: string;

  @IsNumber()
  @IsOptional()
  dailyReadingGoal?: number | undefined;

  @IsNumber()
  @IsOptional()
  yearlyReadingGoal?: number | undefined;

  id!: string;
}
