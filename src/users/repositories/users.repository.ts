import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/users.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findAll(): Promise<User[]> {
    return this.find({
      select: ['id', 'username', 'firstName', 'lastName', 'email', 'isActive', 'createdAt', 'updatedAt'],
    });
  }

  findUserById(id: number): Promise<User | undefined> {
    return this.findOne(id, {
      select: ['id', 'username', 'firstName', 'lastName', 'email', 'isActive', 'createdAt', 'updatedAt'],
    });
  }

  findUserRole(id: number): Promise<User | undefined> {
    return this.findOne(id, {
      relations: ['rol'],
      select: ['id', 'username', 'rol', 'isActive'],
    });
  }

  findUserByUsername(username: string): Promise<User | undefined> {
    return this.findOne({ where: { username, isActive: true } });
  }
}
