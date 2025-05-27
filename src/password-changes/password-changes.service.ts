import { Injectable } from '@nestjs/common';
import { CreatePasswordChangeDto } from './dto/create-password-change.dto';
import { UpdatePasswordChangeDto } from './dto/update-password-change.dto';

@Injectable()
export class PasswordChangesService {
  create(createPasswordChangeDto: CreatePasswordChangeDto) {
    return 'This action adds a new passwordChange';
  }

  findAll() {
    return `This action returns all passwordChanges`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passwordChange`;
  }

  update(id: number, updatePasswordChangeDto: UpdatePasswordChangeDto) {
    return `This action updates a #${id} passwordChange`;
  }

  remove(id: number) {
    return `This action removes a #${id} passwordChange`;
  }
}
