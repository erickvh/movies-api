import { Controller, Get, Param, ParseIntPipe, Delete, Body, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './entities/tags.entity';
import { TagDto } from './dto/tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Get('')
  getTags(): Promise<Array<Tag>> {
    return this.tagsService.getTags();
  }

  @Get(':id')
  getTag(@Param('id', new ParseIntPipe()) id: number): Promise<Tag> {
    return this.tagsService.getTag(id);
  }

  @Post('')
  createTag(@Body() tagDto: TagDto): Promise<Tag> {
    return this.tagsService.createTag(tagDto);
  }

  @Delete(':id')
  removeTag(@Param('id', new ParseIntPipe()) id: number): Promise<Tag> {
    return this.tagsService.removeTag(id);
  }
}
