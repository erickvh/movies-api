import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AccessToken } from './interfaces/auth.interface';
import { UserParam } from 'src/auth/decorators/user.decorator';
import { AuthenticatedUserI } from 'src/users/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('signIn')
  login(@UserParam() user: AuthenticatedUserI): AccessToken {
    return this.authService.getToken(user);
  }
}
