import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ShutterSync API')
    .setDescription('The ShutterSync API description')
    .setVersion('1.0')
    .addTag('shuttersync')
    .build();

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(cookieParser(process.env.JWT_SECRET));
  app.use(
    session({
      secret: process.env.JWT_SECRET || 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      },
    }),
  );
  // app.use(
  //   csurf({
  //     cookie: {
  //       secure: process.env.NODE_ENV === 'production',
  //       sameSite: 'strict',
  //     },
  //   }),
  // );

  await app.listen(process.env.PORT ?? 8080);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
