import { EntityRepository, Repository, In } from 'typeorm';
import { Tag } from '../entities/tags.entity';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  findById(id: number): Promise<Tag | undefined> {
    return this.findOne(id);
  }

  async findOrCreateTags(tags: string[]): Promise<Array<Tag>> {
    const existingTags = await this.find({ name: In(tags) });
    const existingTagsName = existingTags.map(tag => tag.name);
    const notExistingTagsName = tags.filter(tag => !existingTagsName.includes(tag));
    const notExistingTags = notExistingTagsName.map(tagName => ({
      name: tagName,
    }));
    const newTags = await this.save(notExistingTags);
    return [...existingTags, ...newTags];
  }
}
