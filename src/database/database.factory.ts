import { DynamicModule, Module } from '@nestjs/common';
import { PostgresModule } from './postgres.module';
import { SqliteModule } from './sqlite.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ConnectionRefusedError } from 'sequelize';

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
  private static readonly config = new ConfigService();

  private static getDatabaseModule():
    | typeof PostgresModule
    | typeof SqliteModule {
    const modules: Record<
      DatabaseModuleName,
      typeof PostgresModule | typeof SqliteModule
    > = {
      postgres: PostgresModule,
      sqlite: SqliteModule,
    };

    const dbDialect = this.config.getOrThrow<DatabaseModuleName>('DB_DIALECT');
    if (dbDialect !== 'postgres' && dbDialect !== 'sqlite') {
      throw new ConnectionRefusedError(
        new Error('Database dialect must be postgres or sqlite.'),
      );
    }
    return modules[dbDialect];
  }

  public static forRoot(): DynamicModule {
    const module = DatabaseFactoryModule.getDatabaseModule();
    return module as unknown as DynamicModule;
  }

  public static forFeature(entities: any[]): DynamicModule {
    const module = DatabaseFactoryModule.getDatabaseModule();
    return module.forFeature(entities);
  }
}
