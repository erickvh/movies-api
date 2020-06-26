import { Controller, UseGuards, Param, ParseIntPipe, Body, Put, Get, Post, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateResult } from 'typeorm';
import { ChangePaswordDto } from './dto/change-password.dto';
import { User } from './entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Order } from 'src/orders/entities/orders.entity';
import { OrdersService } from 'src/orders/orders.service';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { UserSerializer } from './serializers/user.serializer';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ChangeRolDto } from './dto/change-rol.dto';
import { SessionGuard } from 'src/auth/guards/session.guard';
import { Rent } from 'src/rents/entities/rents.entity';
import { RentsService } from 'src/rents/rents.service';
import { CreateRentDto } from 'src/rents/dto/create-rent.dto';

@UseGuards(AuthGuard('jwt'), SessionGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService,
    private readonly rentsService: RentsService,
  ) {}

  @Roles('admin')
  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Roles('admin')
  @Get(':id')
  getUser(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.usersService.getUser(id);
  }
  @Roles('admin')
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserSerializer> {
    return new UserSerializer(await this.usersService.createUser(createUserDto));
  }

  @Roles('admin')
  @Put(':id')
  updateUser(@Param('id', new ParseIntPipe()) id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Roles('admin')
  @Delete(':id')
  removeUser(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.usersService.removeUser(id);
  }

  @Roles('admin')
  @Patch(':id/changePassword')
  async changePassword(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() changePasswordDto: ChangePaswordDto,
  ): Promise<UpdateResult> {
    return this.usersService.changePassword(id, changePasswordDto.password);
  }

  @Roles('admin')
  @Patch(':id/changeRole')
  changeRol(@Param('id', new ParseIntPipe()) id: number, @Body() changeRolDto: ChangeRolDto): Promise<User> {
    return this.usersService.changeRol(id, changeRolDto);
  }

  @Roles('admin', 'client')
  @Get(':id/orders')
  async getOrdersByUser(@Param('id', new ParseIntPipe()) id: number): Promise<Order[]> {
    const user = await this.usersService.getUser(id);
    return this.ordersService.getOrdersByUserId(user.id);
  }

  @Roles('admin', 'client')
  @Post(':id/orders')
  async addOrderToUser(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const user = await this.usersService.getUser(id);
    return this.ordersService.addOrderToUser(user, createOrderDto);
  }

  @Roles('admin', 'client')
  @Get(':id/rents')
  async getRentsByUser(@Param('id', new ParseIntPipe()) id: number): Promise<Rent[]> {
    const user = await this.usersService.getUser(id);
    return this.rentsService.getRentsByUserId(user.id);
  }

  @Roles('admin', 'client')
  @Post(':id/rents')
  async addRentToUser(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() createRentDto: CreateRentDto,
  ): Promise<Rent> {
    const user = await this.usersService.getUser(id);
    return this.rentsService.addRentToUser(user, createRentDto);
  }

  @Roles('admin', 'client')
  @Patch(':id/rents/:rentId/return')
  async returnRentedMovie(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('rentId', new ParseIntPipe()) rentId: number,
  ): Promise<Rent> {
    const user = await this.usersService.getUser(id);
    const rent = await this.rentsService.getRentByIdAndUser(rentId, user);
    return this.rentsService.returnRentedMovie(rent);
  }
}
