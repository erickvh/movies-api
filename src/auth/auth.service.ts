import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthenticatedUserI } from '../users/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from './interfaces/auth.interface';
import { UserRepository } from 'src/users/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<AuthenticatedUserI | null> {
    const user = await this.userRepository.findUserByUsername(username);
    if (user && this.usersService.compareHash(password, user.password)) {
      const authenticatedUser = {
        id: user.id,
        username: user.username,
      };
      return authenticatedUser;
    }
    return null;
  }

  getToken(user: AuthenticatedUserI): AccessToken {
    return {
      accessToken: this.jwtService.sign(user),
    };
  }
}
