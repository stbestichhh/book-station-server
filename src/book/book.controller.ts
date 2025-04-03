import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { WhereOptions } from 'sequelize';
import { BookEntity } from '../database';
import { CreateBookDto, UpdateBookDto } from './dto';
import { ThrottlerGuard } from '@nestjs/throttler';
import { JwtGuard } from '../auth/guards';
import { CurrentUser } from '../auth/decorators';

@UseGuards(ThrottlerGuard, JwtGuard)
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  public async getAllBooks(
    @CurrentUser('sub') userId: string,
    @Query() options?: WhereOptions<BookEntity>,
  ) {
    return await this.bookService.getAll(userId, options);
  }

  @Get(':bookId')
  public async getOneBookById(
    @Param('bookId') bookId: number,
    @CurrentUser('sub') userId: string,
  ) {
    return await this.bookService.getOneById(bookId, userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createNewBook(
    @Body() dto: CreateBookDto,
    @CurrentUser('sub') userId: string,
  ) {
    return await this.bookService.create(dto, userId);
  }

  @Patch(':bookId')
  public async updateBookByID(
    @Param('bookId') bookId: number,
    @Body() dto: UpdateBookDto,
    @CurrentUser('sub') userId: string,
  ) {
    return await this.bookService.updateById(bookId, dto, userId);
  }

  @Delete(':bookId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteBookById(
    @Param('bookId') bookId: number,
    @CurrentUser('sub') userId: string,
  ) {
    return await this.bookService.deleteById(bookId, userId);
  }
}
