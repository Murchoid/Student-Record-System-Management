import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';
import { SessionsModule } from './sessions.module';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<SessionsModule>,
  ) {}

  create(createSessionDto: CreateSessionDto) {
    return this.sessionRepository.save(createSessionDto);
  }

  findAll() {
    return this.sessionRepository.find();
  }

  findOne(id: number) {
    return this.sessionRepository.findOneBy({
      where: { id },
    });
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    return this.sessionRepository.update(id, updateSessionDto);
  }

  remove(id: number) {
    return this.sessionRepository.delete(id);
  }
}
