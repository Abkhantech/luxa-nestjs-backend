import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const builder = new DocumentBuilder()
    .setTitle('Luxa APIs')
    .setDescription('This API suite serves the web clients.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description:
          'Enter JWT token to authenticate the service provider user',
        in: 'header',
      },
      process.env.X_ACCESS_TOKEN,
    )
    .build();
  const document = SwaggerModule.createDocument(app, builder);
  SwaggerModule.setup('/', app, document);

  const PORT = parseInt(process.env.PORT) || 5000;
  await app.listen(PORT, () => {
    Logger.log('[BaseUrl/api] Swagger Documentation Url');
    console.log('APP RUNNING ON PORT', PORT);
  });
}

bootstrap();
