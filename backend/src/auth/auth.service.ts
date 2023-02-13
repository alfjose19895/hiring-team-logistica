import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { AuthResponse, SignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signUp(signupDto: SignupDto): Promise<AuthResponse> {
    const user = await this.usersService.create(signupDto);

    //

    return { jwt: '', user };
  }
}
