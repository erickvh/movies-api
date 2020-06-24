import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from 'src/auth/dto/auth.dto';
import { UserRepository } from './repositories/users.repository';
import { User } from './entities/users.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
  private saltRounds = 10;

  constructor(private readonly userRepository: UserRepository) {}

  async registerUser(user: RegisterUserDto): Promise<User> {
    user.password = this.getHash(user.password);
    return this.userRepository.save(user);
  }

  async changePassword(id: number, password: string): Promise<UpdateResult> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.userRepository.update(id, { password: this.getHash(password) });
  }

  getHash(password: string): string {
    return bcrypt.hashSync(password, this.saltRounds);
  }

  compareHash(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
