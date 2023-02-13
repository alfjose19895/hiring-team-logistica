import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],

  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), UsersModule],
})
export class AuthModule {}
