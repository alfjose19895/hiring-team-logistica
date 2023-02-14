import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { AuthResponse, LoginDto, SignupDto } from './dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signupDto: SignupDto): Promise<AuthResponse> {
    const user = await this.usersService.create(signupDto);

    const token = this.getJwt(user.id);

    return { jwt: token, user };
  }

  async login({ email, password }: LoginDto): Promise<AuthResponse> {
    const user = await this.usersService.findOneByEmail(email);
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException([
        'There was a problem logging in. Check your email and password or create an account',
      ]);
    delete user.password;

    const token = this.getJwt(user.id);

    return { jwt: token, user };
  }

  checkAuthStatus(user: User): AuthResponse {
    return { user, jwt: this.getJwt(user.id) };
  }

  private getJwt(id: number) {
    const token = this.jwtService.sign({ id });
    return token;
  }
}
