import { EntityRepository, Repository } from 'typeorm';
import { Token } from '../entities/tokens.entity';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {
  findByToken(token: string): Promise<Token | undefined> {
    return this.findOne({ where: { token } });
  }
}
