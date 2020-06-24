import { Controller, Post, UseGuards, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AccessToken } from './interfaces/auth.interface';
import { UserParam } from 'src/auth/decorators/user.decorator';
import { AuthenticatedUserI } from 'src/users/interfaces/user.interface';
import { RegisterUserDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { UserSerializer } from 'src/users/serializers/user.serializer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signUp')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<UserSerializer> {
    return new UserSerializer(await this.usersService.registerUser(registerUserDto));
  }

  @UseGuards(AuthGuard('local'))
  @Post('signIn')
  login(@UserParam() user: AuthenticatedUserI): AccessToken {
    return this.authService.getToken(user);
  }
}
