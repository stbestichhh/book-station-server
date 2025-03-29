import { Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { WhereOptions } from 'sequelize';
import { BookEntity } from '../database';
import { CreateBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  public getOneById(id: number) {
    return this.bookRepository.findByPk(id);
  }

  public getAll(options?: WhereOptions<BookEntity>) {
    return this.bookRepository.findAll(options);
  }

  public create(dto: CreateBookDto) {
    return this.bookRepository.create(dto);
  }

  public updateById(id: number, dto: UpdateBookDto) {
    return this.bookRepository.update(id, dto);
  }

  public deleteById(id: number) {
    return this.bookRepository.delete(id);
  }
}
