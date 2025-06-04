import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CacheDisService } from './cache-dis.service';
import { CreateCacheDiDto } from './dto/create-cache-di.dto';
import { UpdateCacheDiDto } from './dto/update-cache-di.dto';

@Controller('cache-dis')
export class CacheDisController {
  constructor(private readonly cacheDisService: CacheDisService) {}

  @Post()
  create(@Body() createCacheDiDto: CreateCacheDiDto) {
    return this.cacheDisService.create(createCacheDiDto);
  }

  @Get()
  findAll() {
    return this.cacheDisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cacheDisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCacheDiDto: UpdateCacheDiDto) {
    return this.cacheDisService.update(+id, updateCacheDiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cacheDisService.remove(+id);
  }
}
