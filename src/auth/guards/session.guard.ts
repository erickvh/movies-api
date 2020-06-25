import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenRepository } from '../repositories/tokens.repository';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader.split(' ')[1];
    const token = await this.tokenRepository.findByToken(bearerToken);
    if (!token) {
      return false;
    }
    return true;
  }
}
