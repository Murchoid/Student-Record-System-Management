import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './http.exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Student Record Management System')
    .setDescription(
      "🎓 Welcome to the Student Record Management System API! 🚀\n\n" +
        'Easily manage students, admins, courses, subjects, reports, feedback, sessions, enrollments, and user profiles all in one place. ' +
        'This API supports secure authentication, role-based access, and full CRUD operations for all major entities. ' +
        'Empower your institution to efficiently track academic records, user activities, and more! 📚✨',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      showRequestDuration: true,
      tryItOutEnabled: true,
    },
    customCss: `
    .swagger-ui .topbar { display: none; }  
    .swagger-ui .info { margin-bottom: 20px; }
  `,
    customSiteTitle: 'Students Record Management System',
  });

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log('App listening in port 3000');
  });
}
bootstrap();
