import { Model } from 'sequelize-typescript';
import { CreationAttributes, ModelAttributes, WhereOptions } from 'sequelize';

export interface IRepository<T extends Model> {
  create(attributes: CreationAttributes<T>): Promise<T>;
  findByPk(primaryKey: string | number): Promise<T>;
  findOne(options: WhereOptions<T>): Promise<T>;
  findAll(options?: WhereOptions<T>): Promise<T[]>;
  update(
    primaryKey: string | number,
    options?: Partial<ModelAttributes<T>>,
  ): Promise<T>;
  delete(primaryKey: string | number): Promise<void>;
}
