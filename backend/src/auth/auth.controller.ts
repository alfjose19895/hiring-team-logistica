import { Body, Controller, Get, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Auth, GetUser } from './decorators';
import { LoginDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() signupDto: SignupDto) {
    return this.authService.signUp(signupDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @Auth()
  testingPrivateRoute(@GetUser('email') userEmail: string) {
    return {
      ok: true,
      msg: 'Hello world from a private route',
      userEmail,
    };
  }
}
