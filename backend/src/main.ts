import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const apiPrefix = configService.get<string>('apiPrefix', 'api/v1');
  app.setGlobalPrefix(apiPrefix, { exclude: [''] });
  app.enableCors();

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      enableDebugMessages: true, // Useful for development
      exceptionFactory: (errors) => {
        errors.forEach((err) => {
          console.log('Validation failed for property:', err.property);
          console.log('Value received:', err.value); // This shows exactly what came from the client
          console.log('Constraints violated:', err.constraints);
        });
        return new BadRequestException(errors);
      },
    }),
  );

  await app.listen(port);
}
bootstrap();
