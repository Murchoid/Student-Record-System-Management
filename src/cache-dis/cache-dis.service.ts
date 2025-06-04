import { Injectable } from '@nestjs/common';
import { CreateCacheDiDto } from './dto/create-cache-di.dto';
import { UpdateCacheDiDto } from './dto/update-cache-di.dto';

@Injectable()
export class CacheDisService {
  create(createCacheDiDto: CreateCacheDiDto) {
    return 'This action adds a new cacheDi';
  }

  findAll() {
    return `This action returns all cacheDis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cacheDi`;
  }

  update(id: number, updateCacheDiDto: UpdateCacheDiDto) {
    return `This action updates a #${id} cacheDi`;
  }

  remove(id: number) {
    return `This action removes a #${id} cacheDi`;
  }
}
