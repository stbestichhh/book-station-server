import { DynamicModule, Module } from '@nestjs/common';
import { PostgresModule } from './postgres.module';
import { SqliteModule } from './sqlite.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

type DatabaseModuleName = 'postgres' | 'sqlite';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_DIALECT: Joi.string()
          .regex(/^(postgres|sqlite)$/)
          .required(),
      }),
    }),
  ],
})
export class DatabaseFactoryModule {
  public static exportModule(): DynamicModule {
    const config = new ConfigService();
    const modules: Record<DatabaseModuleName, PostgresModule | SqliteModule> = {
      postgres: PostgresModule,
      sqlite: SqliteModule,
    };

    return modules[
      config.getOrThrow<DatabaseModuleName>('DB_DIALECT')
    ] as DynamicModule;
  }
}
