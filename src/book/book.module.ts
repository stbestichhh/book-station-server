import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { BookEntity, DatabaseFactoryModule } from '../database';

@Module({
  imports: [DatabaseFactoryModule.forFeature([BookEntity])],
  providers: [BookService, BookRepository],
  controllers: [BookController],
})
export class BookModule {}
