import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { BookEntity } from './book.entity';

export interface UserCreationAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  dailyReadingGoal?: number;
  yearlyReadingGoal?: number;
}

@Table({ tableName: 'users' })
export class UserEntity extends Model<UserEntity, UserCreationAttributes> {
  @PrimaryKey
  @Column({ unique: true, allowNull: false })
  id!: string;

  @Column({ allowNull: false })
  username!: string;

  @Column({ unique: true, allowNull: false })
  email!: string;

  @Column({ allowNull: false })
  password!: string;

  @Column({ allowNull: true, defaultValue: 15 })
  dailyReadingGoal?: number;

  @Column({ allowNull: true, defaultValue: 5 })
  yearlyReadingGoal?: number;

  @HasMany(() => BookEntity)
  books?: BookEntity[];
}
