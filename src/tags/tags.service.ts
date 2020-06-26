import { Injectable, NotFoundException } from '@nestjs/common';
import { TagRepository } from './repositories/tags.repository';
import { Tag } from './entities/tags.entity';
import { TagDto } from './dto/tag.dto';

@Injectable()
export class TagsService {
  constructor(private readonly tagRepository: TagRepository) {}
  getTags(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  async getTag(id: number): Promise<Tag> {
    const tag = await this.tagRepository.findById(id);
    if (!tag) {
      throw new NotFoundException(`Tag with id ${id} not found`);
    }
    return tag;
  }

  createTag(tagDto: TagDto): Promise<Tag> {
    return this.tagRepository.save(tagDto);
  }

  async removeTag(id: number): Promise<Tag> {
    const tag = await this.getTag(id);
    tag.isActive = false;
    return this.tagRepository.save(tag);
  }

  findOrCreateTags(tags: string[] | undefined): Promise<Tag[]> | Tag[] {
    if (!tags || tags.length === 0) {
      const emptyTags: Tag[] = [];
      return emptyTags;
    }
    return this.tagRepository.findOrCreateTags(tags);
  }
}
