import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportsModule } from './reports.module';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<ReportsModule>,
  ) {}

  create(createReportDto: CreateReportDto) {
    return this.reportRepository.save(createReportDto);
  }

  findAll() {
    return this.reportRepository.find();
  }

  findOne(id: number) {
    return this.reportRepository.findOneBy({
      where: { id },
    });
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return this.reportRepository.update(id, updateReportDto);
  }

  remove(id: number) {
    return this.reportRepository.delete(id);
  }
}
