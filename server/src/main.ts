import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('ShutterSync API')
        .setDescription('The ShutterSync API description')
        .setVersion('1.0')
        .addTag('shuttersync')
        .build();
     
    app.enableCors();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    app.use(cookieParser(process.env.JWT_SECRET));



  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
