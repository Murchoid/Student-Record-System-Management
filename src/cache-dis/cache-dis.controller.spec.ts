import { Test, TestingModule } from '@nestjs/testing';
import { CacheDisController } from './cache-dis.controller';
import { CacheDisService } from './cache-dis.service';

describe('CacheDisController', () => {
  let controller: CacheDisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CacheDisController],
      providers: [CacheDisService],
    }).compile();

    controller = module.get<CacheDisController>(CacheDisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
