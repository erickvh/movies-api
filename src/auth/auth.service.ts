import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthenticatedUserI } from '../users/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from './interfaces/auth.interface';
import { Rol } from './entities/roles.entity';
import { RolRepository } from './repositories/roles.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly rolRepository: RolRepository,
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

  getToken(user: AuthenticatedUserI): AccessToken {
    return {
      accessToken: this.jwtService.sign(user),
    };
  }

  async getRolByName(name: string): Promise<Rol> {
    const rol = await this.rolRepository.findOne({ where: { name } });
    if (!rol) {
      throw new NotFoundException(`Rol with name ${name} not found`);
    }
    return rol;
  }
}
