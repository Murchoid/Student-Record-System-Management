import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PasswordChangesService } from './password-changes.service';
import { CreatePasswordChangeDto } from './dto/create-password-change.dto';
import { UpdatePasswordChangeDto } from './dto/update-password-change.dto';
import { Roles } from 'src/auths/decorators/roles.decorator';
import { eROLE } from 'src/user-profiles/entities/user-profile.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Password changes')
@Controller('password-changes')
export class PasswordChangesController {
  constructor(
    private readonly passwordChangesService: PasswordChangesService,
  ) {}

  @Roles(eROLE.ADMIN, eROLE.STUDENT)
  @Post()
  create(@Body() createPasswordChangeDto: CreatePasswordChangeDto) {
    return this.passwordChangesService.create(createPasswordChangeDto);
  }

  @Roles(eROLE.SADMIN)
  @Get()
  findAll() {
    return this.passwordChangesService.findAll();
  }

  @Roles(eROLE.SADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passwordChangesService.findOne(+id);
  }

  @Roles(eROLE.SADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordChangeDto: UpdatePasswordChangeDto,
  ) {
    return this.passwordChangesService.update(+id, updatePasswordChangeDto);
  }

  @Roles(eROLE.SADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passwordChangesService.remove(+id);
  }
}
