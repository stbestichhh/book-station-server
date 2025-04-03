import { Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { WhereOptions } from 'sequelize';
import { BookEntity } from '../database';
import { CreateBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  public getOneById(id: number, userId: string) {
    return this.bookRepository.findOne({
      id,
      userId,
    });
  }

  public getAll(userId: string, options?: WhereOptions<BookEntity>) {
    return this.bookRepository.findAll({
      ...options,
      userId,
    });
  }

  public create(dto: CreateBookDto, userId: string) {
    return this.bookRepository.create({
      ...dto,
      userId,
    });
  }

  public async updateById(id: number, dto: UpdateBookDto, userId: string) {
    await this.getOneById(id, userId);
    return this.bookRepository.update(id, dto);
  }

  public async deleteById(id: number, userId: string) {
    await this.getOneById(id, userId);
    return this.bookRepository.delete(id);
  }
}
