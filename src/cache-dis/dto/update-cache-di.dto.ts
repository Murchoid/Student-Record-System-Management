import { PartialType } from '@nestjs/mapped-types';
import { CreateCacheDiDto } from './create-cache-di.dto';

export class UpdateCacheDiDto extends PartialType(CreateCacheDiDto) {}
