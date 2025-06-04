import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './http.exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle('Student Record Management System')
    .setDescription('A student\'s API to fetch, manage, and edit student content')
    .setVersion('1.0')
    .addTag('dis-nuts')
    .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log('App listening in port 3000');
  });
}
bootstrap();
