import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { SignupDto } from '../auth/dto/signup.dto';
import { UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(signupInput: SignupDto): Promise<User> {
    try {
      let user = this.userRepository.create({
        ...signupInput,
        password: bcrypt.hashSync(signupInput.password, 10),
      });

      user = await this.userRepository.save(user);
      delete user.password;
      delete user.isActive;

      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { email },
        select: { email: true, password: true, id: true, fullName: true },
      });
      return user;
    } catch (error) {
      throw new UnauthorizedException([
        'There was a problem logging in. Check your email and password or create an account',
      ]);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException([
        error.detail.replace(/Key|[\(\)\=]/g, '').trim(),
      ]);

    if (error.code === 'err-001') throw new NotFoundException(error.detail);

    console.log(error);
    throw new InternalServerErrorException(['Please check server logs']);
  }
}
