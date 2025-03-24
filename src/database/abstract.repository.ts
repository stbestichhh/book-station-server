import { Model, ModelCtor } from 'sequelize-typescript';
import { Logger } from '@nestjs/common';
import { IRepository } from './repository.interface';
import { CreationAttributes, WhereOptions } from 'sequelize';

export abstract class AbstractRepository<T extends Model>
  implements IRepository<T>
{
  protected readonly logger: Logger = new Logger(this.constructor.name);

  protected constructor(protected readonly model: ModelCtor<T>) {}

  public create(attributes: CreationAttributes<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }

  public findByPk(primaryKey: number): Promise<T> {
    throw new Error('Method not implemented.');
  }

  public findOne(options: WhereOptions<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }

  public findAll(options?: WhereOptions<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  public update(options?: Partial<CreationAttributes<T>>): Promise<T> {
    throw new Error('Method not implemented.');
  }

  public delete(primaryKey: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
