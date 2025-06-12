import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService, TypeOrmConfigServiceForNeon } from './configs';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
     useClass: TypeOrmConfigServiceForNeon
    }),
  ],
})
export class DatabaseModule {}
