import { Controller, HttpCode, HttpStatus, Logger, Post } from '@nestjs/common';
import { SeedDataService } from './seed-data.service';
import { Public } from 'src/auths/decorators/public.decorator';

@Controller('api/seed-data')
export class SeedDataController {
  private logger = new Logger(SeedDataController.name);
  constructor(private readonly seedDataService: SeedDataService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  async seedData() {
    this.logger.log('Seeding begins..');
    return await this.seedDataService.seedData();
  }
}
