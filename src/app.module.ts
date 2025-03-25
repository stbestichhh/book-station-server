import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { BookEntity, DatabaseFactoryModule } from './database';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().port().required(),
        HTTP_HOST: Joi.string().hostname().required(),
      }),
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    DatabaseFactoryModule.forRoot(),
    DatabaseFactoryModule.forFeature([BookEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
