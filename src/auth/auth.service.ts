import { Injectable, NotFoundException, Inject, forwardRef, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthenticatedUserI } from '../users/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from './interfaces/auth.interface';
import { Rol } from './entities/roles.entity';
import { RolRepository } from './repositories/roles.repository';
import { TokenRepository } from './repositories/tokens.repository';
import { Token } from './entities/tokens.entity';
import { User } from 'src/users/entities/users.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly rolRepository: RolRepository,
    private readonly tokenRepository: TokenRepository,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<AuthenticatedUserI | null> {
    const user = await this.usersService.findByUserName(username);
    if (user && this.usersService.compareHash(password, user.password)) {
      const authenticatedUser = {
        id: user.id,
        username: user.username,
      };
      return authenticatedUser;
    }
    return null;
  }

  getTokenForUser(user: AuthenticatedUserI): AccessToken {
    return {
      accessToken: this.jwtService.sign(user),
    };
  }

  async getToken(bearerToken: string): Promise<Token> {
    const token = await this.tokenRepository.findByToken(bearerToken);
    if (!token) {
      throw new UnauthorizedException();
    }
    return token;
  }

  saveToken(user: User, token: string): Promise<Token> {
    return this.tokenRepository.save({ token, user });
  }

  deleteToken(token: Token): Promise<DeleteResult> {
    return this.tokenRepository.delete(token.id);
  }

  async getRolByName(name: string): Promise<Rol> {
    const rol = await this.rolRepository.findOne({ where: { name } });
    if (!rol) {
      throw new NotFoundException(`Rol with name ${name} not found`);
    }
    return rol;
  }
}
