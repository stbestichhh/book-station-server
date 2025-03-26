import { AbstractRepository, BookEntity } from '../database';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class BookRepository extends AbstractRepository<BookEntity> {
  constructor(
    @InjectModel(BookEntity) protected readonly model: typeof BookEntity,
  ) {
    super(model);
  }
}
