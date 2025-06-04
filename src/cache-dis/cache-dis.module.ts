import { Module } from '@nestjs/common';
import { CacheDisService } from './cache-dis.service';
import { CacheDisController } from './cache-dis.controller';

@Module({
  controllers: [CacheDisController],
  providers: [CacheDisService],
})
export class CacheDisModule {}
