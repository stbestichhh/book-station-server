import { Model, ModelCtor } from 'sequelize-typescript';
import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IRepository } from './repository.interface';
import {
  BaseError,
  CreationAttributes,
  ModelAttributes,
  WhereOptions,
} from 'sequelize';
import { v7 as uuidv7 } from 'uuid';

export abstract class AbstractRepository<T extends Model>
  implements IRepository<T>
{
  protected readonly logger: Logger = new Logger(this.constructor.name);

  protected constructor(protected readonly model: ModelCtor<T>) {}

  public async create(attributes: CreationAttributes<T>): Promise<T> {
    return this.catchable<T>(() =>
      this.model.create({
        id: uuidv7(),
        ...attributes,
      }),
    );
  }

  public async findByPk(primaryKey: string | number): Promise<T> {
    const entity = await this.catchable<T | null>(() =>
      this.model.findByPk(primaryKey),
    );
    if (!entity) {
      throw new NotFoundException(
        `Entity ${this.model.name} not found by id ${primaryKey}`,
      );
    }
    return entity;
  }

  public async findOne(options: WhereOptions<T>): Promise<T> {
    const entity = await this.catchable<T | null>(() =>
      this.model.findOne({ where: options }),
    );
    if (!entity) {
      throw new NotFoundException(
        `Entity ${this.model.name} not found by options ${JSON.stringify(options)}`,
      );
    }

    return entity;
  }

  public async findAll(options?: WhereOptions<T>): Promise<T[]> {
    const entities = await this.catchable<T[]>(() =>
      this.model.findAll({ where: options }),
    );
    if (!entities.length) {
      throw new NotFoundException(
        `Any entity ${this.model.name} not found by options ${JSON.stringify(options)}`,
      );
    }
    return entities;
  }

  public async update(
    primaryKey: string | number,
    options: Partial<ModelAttributes<T>>,
  ): Promise<T> {
    const entity = await this.findByPk(primaryKey);
    return this.catchable<T>(() => entity.set(options).save());
  }

  public async delete(primaryKey: string | number): Promise<void> {
    const entity = await this.findByPk(primaryKey);
    return this.catchable<void>(() => entity.destroy());
  }

  private async catchable<R>(callback: () => Promise<R>): Promise<R> {
    try {
      return await callback();
    } catch (e) {
      this.logger.error(e instanceof Error ? e.message : e);

      if (e instanceof BaseError) {
        throw new InternalServerErrorException(`Sequelize error`, {
          cause: e.message,
          description: `Error while performing database operation on model ${this.model.name}`,
        });
      }

      throw new InternalServerErrorException();
    }
  }
}
