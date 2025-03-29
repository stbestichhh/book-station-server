import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';
import { SqliteMockModule } from '../database/sqlite.module.mock';
import { BookEntity } from '../database';
import { CreateBookDto } from './dto';

describe('AppController', () => {
  let bookController: BookController;

  beforeAll(async () => {
    const bookModule: TestingModule = await Test.createTestingModule({
      imports: [SqliteMockModule, SqliteMockModule.forFeature([BookEntity])],
      controllers: [BookController],
      providers: [BookService, BookRepository],
    }).compile();

    await BookEntity.sync({ force: true });

    bookController = bookModule.get<BookController>(BookController);
  });

  afterAll(async () => {
    await BookEntity.drop();
  });

  describe('Book controller', () => {
    it('Should be defined!"', () => {
      expect(bookController).toBeDefined();
    });
  });

  describe('Create books', () => {
    it('Should create book with not all attributes', async () => {
      const bookData: CreateBookDto = {
        title: 'First Book',
        author: 'Fist Author',
        pages: 100,
      };

      const book = await bookController.createNewBook(bookData);
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

      const book = await bookController.createNewBook(bookData);
      expect(book).toMatchObject(bookData);
    });

    it('Should throw if not enough data in body', async () => {
      const bookData = {
        author: 'Some Author',
      };

      await expect(async () => {
        return await bookController.createNewBook(bookData as CreateBookDto);
      }).rejects.toThrow();
    });
  });

  describe('Get book', () => {
    it('get book by id', async () => {
      const book = await bookController.getOneBookById(1);

      expect(book).toMatchObject({
        title: 'First Book',
        author: 'Fist Author',
        pages: 100,
      });
    });

    it('Should throw on wrong id', async () => {
      await expect(
        async () => await bookController.getOneBookById(100),
      ).rejects.toThrow();
    });

    it('Should get all books', async () => {
      const books = await bookController.getAllBooks();
      expect(books).toHaveLength(2);
    });

    it('Should get all books by props', async () => {
      const secondBook = await bookController.getAllBooks({
        title: 'Second Book',
      });
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
        bookController.updateBookByID(100, { pages: 100 }),
      ).rejects.toThrow();
    });

    it('Should leave book with no updates', async () => {
      const book = await bookController.updateBookByID(1, {});
      expect(book).toMatchObject({ pages: 100 });
    });

    it('Should update book', async () => {
      const book = await bookController.updateBookByID(1, { pagesRead: 150 });
      expect(book).not.toMatchObject({ pagesRead: 0 });
      expect(book).toMatchObject({ pagesRead: 150 });
    });
  });

  describe('Delete book', () => {
    it('Should throw on wrong id', async () => {
      await expect(async () =>
        bookController.deleteBookById(100),
      ).rejects.toThrow();
    });

    it('Should delete book', async () => {
      await bookController.deleteBookById(1);
      const books = await bookController.getAllBooks();

      await expect(
        async () => await bookController.deleteBookById(1),
      ).rejects.toThrow();
      expect(books).toHaveLength(1);
    });
  });
});
