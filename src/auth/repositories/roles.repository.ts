import { EntityRepository, Repository } from 'typeorm';
import { Rol } from '../entities/roles.entity';

@EntityRepository(Rol)
export class RolRepository extends Repository<Rol> {
  findById(id: number): Promise<Rol | undefined> {
    return this.findOne(id);
  }
}
