import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRepository } from './repositories/users.repository';
import { User } from './entities/users.entity';
import { UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { ChangeRolDto } from './dto/change-rol.dto';

@Injectable()
export class UsersService {
  private saltRounds = 10;

  constructor(private readonly userRepository: UserRepository, private readonly authService: AuthService) {}

  getHash(password: string): string {
    return bcrypt.hashSync(password, this.saltRounds);
  }

  compareHash(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  findByUserName(username: string): Promise<User | undefined> {
    return this.userRepository.findUserByUsername(username);
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    user.password = this.getHash(user.password);
    const rol = await this.authService.getRolByName(user.rol);
    const newUser = {
      ...user,
      rol,
    };
    return this.userRepository.save(newUser);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUser(id);
    const updateUser = {
      ...user,
      ...updateUserDto,
    };
    return this.userRepository.save(updateUser);
  }

  async removeUser(id: number): Promise<User> {
    const user = await this.getUser(id);
    user.isActive = false;
    return this.userRepository.save(user);
  }

  async changePassword(id: number, password: string): Promise<UpdateResult> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.userRepository.update(id, { password: this.getHash(password) });
  }

  async changeRol(id: number, changeRolDto: ChangeRolDto): Promise<User> {
    const user = await this.getUser(id);
    const rol = await this.authService.getRolByName(changeRolDto.rol);
    user.rol = rol;
    return this.userRepository.save(user);
  }
}
