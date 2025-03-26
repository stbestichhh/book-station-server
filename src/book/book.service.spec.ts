import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { SqliteMockModule } from '../database/sqlite.module.mock';
import { BookEntity } from '../database';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './dto';

describe('BookService', () => {
  let service: BookService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SqliteMockModule, SqliteMockModule.forFeature([BookEntity])],
      providers: [BookService, BookRepository],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create books', () => {
    it('Should create book with not all attributes', async () => {
      const bookData: CreateBookDto = {
        title: 'First Book',
        author: 'Fist Author',
        pages: 100,
      };

      const book = await service.create(bookData);
      expect(book).toMatchObject(bookData);
    });

    it('Should create book with all attributes', async () => {
      const bookData: CreateBookDto = {
        title: 'Second Book',
        author: 'Second Author',
        pages: 200,
        description: 'some description',
        image: 'some image',
        minutesSpent: 50,
        pagesRead: 100,
        status: 'Reading',
      };

      const book = await service.create(bookData);
      expect(book).toMatchObject(bookData);
    });
  });

  describe('get book', () => {
    it('get book by id', async () => {
      const book = await service.getOneById(1);
      expect(book).toMatchObject({
        title: 'First Book',
        author: 'Fist Author',
        pages: 100,
      });
    });

    it('Should throw on wrong id', async () => {
      await expect(async () => await service.getOneById(100)).rejects.toThrow();
    });

    it('Should get all books', async () => {
      const books = await service.getAll();
      expect(books).toHaveLength(2);
    });

    it('Should get all books by props', async () => {
      const secondBook = await service.getAll({ title: 'Second Book' });
      expect(secondBook).toHaveLength(1);
      expect(secondBook[0]).toMatchObject({
        author: 'Second Author',
        pages: 200,
      });
    });
  });

  describe('Update book', () => {
    it('Should throw on wrong id', async () => {
      await expect(async () =>
        service.updateById(100, { pages: 100 }),
      ).rejects.toThrow();
    });

    it('Should leave book with no updates', async () => {
      const book = await service.updateById(1, {});
      expect(book).toMatchObject({ pages: 100 });
    });

    it('Should update book', async () => {
      const book = await service.updateById(1, { pagesRead: 150 });
      expect(book).not.toMatchObject({ pagesRead: 0 });
      expect(book).toMatchObject({ pagesRead: 150 });
    });
  });

  describe('Delete book', () => {
    it('Should throw on wrong id', async () => {
      await expect(async () => service.deleteById(100)).rejects.toThrow();
    });

    it('Should delete book', async () => {
      await service.deleteById(1);
      const books = await service.getAll();

      await expect(async () => await service.getOneById(1)).rejects.toThrow();
      expect(books).toHaveLength(1);
    });
  });
});
