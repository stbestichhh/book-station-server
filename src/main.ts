import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger as PinoLogger } from 'nestjs-pino';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const config = app.get<ConfigService>(ConfigService);
  const logger = new Logger(bootstrap.name);

  const PORT = config.getOrThrow<number>('HTTP_PORT');
  const HOST = config.getOrThrow<string>('HTTP_HOST');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useLogger(app.get(PinoLogger));
  app.use(helmet());
  app.enableCors({
    origin: [
      config.get<string>('FRONTEND_URL_PRODUCTION'),
      config.get<string>('FRONTEND_URL_DEVELOPMENT'),
    ].filter(Boolean),
    methods: config.getOrThrow<string>('CORS_METHODS'),
  } as CorsOptions);

  await app.listen(PORT, HOST, () => {
    logger.log(`Service is running on http://${HOST}:${PORT}`);
  });
}
void bootstrap();
