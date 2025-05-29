import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('POSTGRE_HOST'),
        port: configService.getOrThrow<number>('POSTGRE_PORT'),
        username: configService.getOrThrow<string>('POSTGRE_USER'),
        password: configService.getOrThrow<string>('POSTGRE_PASS'),
        database: configService.getOrThrow<string>('POSTGRE_DB'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
