import { Injectable } from '@nestjs/common';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserProfilesService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  create(createUserProfileDto: CreateUserProfileDto) {
    return this.userProfileRepository.save(createUserProfileDto);
  }

  findAll(name?: string) {
    if (name) {
      const userProfile = this.userProfileRepository.find({
        where: { first_name: name },
      });

      return userProfile;
    }
    return this.userProfileRepository.find();
  }

  findOne(id: number) {
    return this.userProfileRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateUserProfileDto: UpdateUserProfileDto) {
    return this.userProfileRepository.update(id, updateUserProfileDto);
  }

  remove(id: number) {
    return this.userProfileRepository.delete(id);
  }
}
