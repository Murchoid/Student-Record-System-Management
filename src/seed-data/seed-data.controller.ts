import { Controller, HttpCode, HttpStatus, Logger, Post } from '@nestjs/common';
import { SeedDataService } from './seed-data.service';

@Controller('api/seed-data')
export class SeedDataController {

  private logger = new Logger(SeedDataController.name);
  constructor(private readonly seedDataService: SeedDataService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async seedData(){
    this.logger.log("Seeding begins..");
    return await this.seedDataService.seedData();
  }
}
