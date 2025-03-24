import { Model } from 'sequelize-typescript';
import { CreationAttributes, WhereOptions } from 'sequelize';

export interface IRepository<T extends Model> {
  create(attributes: CreationAttributes<T>): Promise<T>;
  findByPk(primaryKey: number): Promise<T>;
  findOne(options: WhereOptions<T>): Promise<T>;
  findAll(options?: WhereOptions<T>): Promise<T[]>;
  update(options?: Partial<CreationAttributes<T>>): Promise<T>;
  delete(primaryKey: number): Promise<void>;
}
