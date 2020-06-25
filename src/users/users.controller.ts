import { Controller, UseGuards, Param, ParseIntPipe, Body, Put, Get, Post, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateResult } from 'typeorm';
import { ChangePaswordDto } from './dto/change-password.dto';
import { User } from './entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Order } from 'src/orders/entities/orders.entity';
import { OrdersService } from 'src/orders/orders.service';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly ordersService: OrdersService) {}

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

  @Get(':id/orders')
  async getOrdersByUser(@Param('id', new ParseIntPipe()) id: number): Promise<Order[]> {
    const user = await this.usersService.getUser(id);
    return this.ordersService.getOrdersByUserId(user.id);
  }

  @Post(':id/orders')
  async addOrderToUser(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const user = await this.usersService.getUser(id);
    return this.ordersService.addOrderToUser(user, createOrderDto);
  }
}
