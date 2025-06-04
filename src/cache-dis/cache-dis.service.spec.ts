import { Test, TestingModule } from '@nestjs/testing';
import { CacheDisService } from './cache-dis.service';

describe('CacheDisService', () => {
  let service: CacheDisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheDisService],
    }).compile();

    service = module.get<CacheDisService>(CacheDisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
