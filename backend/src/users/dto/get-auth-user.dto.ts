import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class GetAuthUserDto extends PartialType(CreateUserDto) {
  public id: number;
}
