import { Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { WhereOptions } from 'sequelize';
import { BookEntity } from '../database';
import { CreateBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  public async getOneById(id: number) {
    return await this.bookRepository.findByPk(id);
  }

  public async getAll(options?: WhereOptions<BookEntity>) {
    return await this.bookRepository.findAll(options);
  }

  public async create(dto: CreateBookDto) {
    return await this.bookRepository.create(dto);
  }

  public async updateById(id: number, dto: UpdateBookDto) {
    return await this.bookRepository.update(id, dto);
  }

  public async deleteById(id: number) {
    return await this.bookRepository.delete(id);
  }
}
