import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookEntity, UserEntity } from './models';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.getOrThrow<string>('POSTGRES_HOST'),
        port: config.getOrThrow<number>('POSTGRES_PORT'),
        username: config.getOrThrow<string>('POSTGRES_USER'),
        password: config.getOrThrow<string>('POSTGRES_PASSWORD'),
        database: config.getOrThrow<string>('POSTGRES_DB'),
        models: [BookEntity, UserEntity],
        autoLoadModels: true,
        sync: { alter: true, force: false },
        logging: (msg) => Logger.log(msg, PostgresModule.name),
      }),
      inject: [ConfigService],
      imports: [
        ConfigModule.forRoot({
          validationSchema: Joi.object({
            POSTGRES_HOST: Joi.string().hostname(),
            POSTGRES_PORT: Joi.number().port(),
            POSTGRES_USER: Joi.string(),
            POSTGRES_PASSWORD: Joi.string(),
            POSTGRES_DB: Joi.string(),
          }),
        }),
      ],
    }),
  ],
})
export class PostgresModule {
  public static forFeature(entities: any[]) {
    return SequelizeModule.forFeature(entities);
  }
}
