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
} from '@nestjs/common';
import { BookService } from './book.service';
import { WhereOptions } from 'sequelize';
import { BookEntity } from '../database';
import { CreateBookDto, UpdateBookDto } from './dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  public async getAllBooks(@Query() options?: WhereOptions<BookEntity>) {
    return await this.bookService.getAll(options);
  }

  @Get(':id')
  public async getOneBookById(@Param('bookId') bookId: number) {
    return await this.bookService.getOneById(bookId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createNewBook(@Body() dto: CreateBookDto) {
    return await this.bookService.create(dto);
  }

  @Patch(':id')
  public async updateBookByID(
    @Param('id') bookId: number,
    @Body() dto: UpdateBookDto,
  ) {
    return await this.bookService.updateById(bookId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteBookById(@Param('id') bookId: number) {
    return await this.bookService.deleteById(bookId);
  }
}
