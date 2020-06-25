import { Controller, UseGuards, Param, ParseIntPipe, Body, Put, Get, Post, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateResult } from 'typeorm';
import { ChangePaswordDto } from './dto/change-password.dto';
import { User } from './entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(@Param('id', new ParseIntPipe()) id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  removeUser(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.usersService.removeUser(id);
  }

  @Put(':id/changePassword')
  async changePassword(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() changePasswordDto: ChangePaswordDto,
  ): Promise<UpdateResult> {
    return this.usersService.changePassword(id, changePasswordDto.password);
  }
}
