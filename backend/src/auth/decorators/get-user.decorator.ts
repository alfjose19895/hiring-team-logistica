import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

import { UpdateUserDto } from '../../users/dto/update-user.dto';

export const GetUser = createParamDecorator(
  (data: keyof UpdateUserDto, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (!user) throw new InternalServerErrorException('User not found');

    return !data ? user : user[data];
  },
);
