import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export type BookStatus =
  | 'Reading'
  | 'Completed'
  | 'Want to read'
  | 'Want to buy';

export const BookStatusEnum = {
  READING: 'Reading',
  COMPLETED: 'Completed',
  WANT_TO_READ: 'Want to read',
  WANT_TO_BUY: 'Want to buy',
} as const;

export interface BookCreationAttributes {
  title: string;
  author: string;
  pages: number;
  description?: string;
  image?: string;
  status?: BookStatus;
  pagesRead?: number;
  minutesSpent?: number;
  yearFinished?: number;
}

@Table({ tableName: 'books' })
export class BookEntity extends Model<BookEntity, BookCreationAttributes> {
  @PrimaryKey
  @Column({ unique: true, allowNull: false, autoIncrement: true })
  id!: number;

  @Column({ unique: true, allowNull: false })
  title!: string;

  @Column({ allowNull: false })
  author!: string;

  @Column({ allowNull: false })
  pages!: number;

  @Column({ allowNull: true })
  description?: string;

  @Column({ allowNull: true })
  image?: string;

  @Column({
    type: DataType.ENUM(...Object.values(BookStatusEnum)),
    allowNull: false,
    defaultValue: BookStatusEnum.WANT_TO_READ,
  })
  status!: BookStatus;

  @Column({ allowNull: false, defaultValue: 0 })
  pagesRead?: number;

  @Column({ allowNull: false, defaultValue: 0 })
  minutesSpent?: number;

  @Column({ allowNull: true })
  yearFinished?: number;
}
