import { Controller, UseGuards, Param, ParseIntPipe, Body, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UpdateResult } from 'typeorm';
import { ChangePaswordDto } from './dto/change-password.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put(':id/changePassword')
  async changePassword(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() changePasswordDto: ChangePaswordDto,
  ): Promise<UpdateResult> {
    return this.usersService.changePassword(id, changePasswordDto.password);
  }
}
