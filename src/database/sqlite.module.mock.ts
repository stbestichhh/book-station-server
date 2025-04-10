import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookEntity, UserEntity } from './models';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'sqlite',
        storage: '.db/data.test.sqlite',
        models: [BookEntity, UserEntity],
        autoLoadModels: true,
        sync: { alter: true, force: true },
        logging: (msg) => Logger.log(msg, SqliteMockModule.name),
      }),
    }),
  ],
})
export class SqliteMockModule {
  public static forFeature(entities: any[]) {
    return SequelizeModule.forFeature(entities);
  }
}
