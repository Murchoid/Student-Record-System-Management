import { Injectable } from '@nestjs/common';
import { CreatePasswordChangeDto } from './dto/create-password-change.dto';
import { UpdatePasswordChangeDto } from './dto/update-password-change.dto';
import { PasswordChange } from './entities/password-change.entity';
import { PasswordChangesModule } from './password-changes.module';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PasswordChangesService {
  constructor(
    @InjectRepository(PasswordChange)
    private readonly passwordChangeRepository: Repository<PasswordChangesModule>,
  ) {}

  create(createPasswordChangeDto: CreatePasswordChangeDto) {
    return this.passwordChangeRepository.save(createPasswordChangeDto);
  }

  findAll() {
    return this.passwordChangeRepository.find();
  }

  findOne(id: number) {
    return this.passwordChangeRepository.findOneBy({
      where: { id },
    });
  }

  update(id: number, updatePasswordChangeDto: UpdatePasswordChangeDto) {
    return this.passwordChangeRepository.update(id, updatePasswordChangeDto);
  }

  remove(id: number) {
    return this.passwordChangeRepository.delete(id);
  }
}
