import { Controller, Post, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AccessToken } from './interfaces/auth.interface';
import { UserParam } from 'src/auth/decorators/user.decorator';
import { AuthenticatedUserI } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';
import { TokenParam } from './decorators/token.decorator';
import { DeleteResult } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('local'))
  @Post('signIn')
  async login(@UserParam() user: AuthenticatedUserI): Promise<AccessToken> {
    const validUser = await this.usersService.getUser(user.id);
    const token = this.authService.getTokenForUser(user);
    await this.authService.saveToken(validUser, token.accessToken);
    return token;
  }

  @Post('signOut')
  @HttpCode(200)
  async logout(@TokenParam() bearerToken: string): Promise<DeleteResult> {
    const token = await this.authService.getToken(bearerToken);
    return this.authService.deleteToken(token);
  }
}
