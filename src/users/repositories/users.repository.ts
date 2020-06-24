import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/users.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findUserById(id: number): Promise<User | undefined> {
    return this.findOne(id);
  }

  findUserByUsername(username: string): Promise<User | undefined> {
    return this.findOne({ where: { username } });
  }
}
