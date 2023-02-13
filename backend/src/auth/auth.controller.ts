import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() signupDto: SignupDto) {
    return this.authService.signUp(signupDto);
  }
}
