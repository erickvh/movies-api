import { EntityRepository, Repository } from 'typeorm';
import { Tag } from '../entities/tags.entity';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  findById(id: number): Promise<Tag | undefined> {
    return this.findOne(id);
  }
}
