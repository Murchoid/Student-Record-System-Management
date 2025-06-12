import { Request } from 'express';
import { JWTPayload } from '../strategies';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  eROLE,
  UserProfile,
} from 'src/user-profiles/entities/user-profile.entity';
import { Repository } from 'typeorm';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

interface IUserRequest extends Request {
  user?: JWTPayload;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requestedRoles = this.reflector.getAllAndOverride<eROLE[]>(
      ROLES_KEY,
      [context.getClass(), context.getHandler()],
    );

    if (!requestedRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<IUserRequest>();
    const { user } = request;

    if (!user) {
      return false;
    }

  
    return requestedRoles.some((role) => user.role === role);
  }
}
