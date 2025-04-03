import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookEntity, UserEntity } from './models';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'sqlite',
        storage: '.db/data.sqlite',
        models: [BookEntity, UserEntity],
        autoLoadModels: true,
        sync: { alter: true, force: false },
        logging: (msg) => Logger.log(msg, SqliteModule.name),
      }),
    }),
  ],
})
export class SqliteModule {
  public static forFeature(entities: any[]) {
    return SequelizeModule.forFeature(entities);
  }
}
