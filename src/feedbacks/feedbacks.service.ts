import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Feedback } from './entities/feedback.entity';
import { FeedbacksModule } from './feedbacks.module';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<FeedbacksModule>,
  ) {}

  create(createfeedbackDto: CreateFeedbackDto) {
    return this.feedbackRepository.save(createfeedbackDto);
  }

  findAll() {
    return this.feedbackRepository.find();
  }

  findOne(id: number) {
    return this.feedbackRepository.findOneBy({
      where: { id },
    });
  }

  update(id: number, updatefeedbackDto: UpdateFeedbackDto) {
    return this.feedbackRepository.update(id, updatefeedbackDto);
  }

  remove(id: number) {
    return this.feedbackRepository.delete(id);
  }
}
