import { Controller, Get, Param, ParseIntPipe, Delete, Body, Post, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './entities/tags.entity';
import { TagDto } from './dto/tag.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { SessionGuard } from 'src/auth/guards/session.guard';

@UseGuards(AuthGuard('jwt'), SessionGuard, RolesGuard)
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Get()
  @Roles('admin')
  getTags(): Promise<Array<Tag>> {
    return this.tagsService.getTags();
  }

  @Get(':id')
  @Roles('admin')
  getTag(@Param('id', new ParseIntPipe()) id: number): Promise<Tag> {
    return this.tagsService.getTag(id);
  }

  @Post()
  @Roles('admin')
  createTag(@Body() tagDto: TagDto): Promise<Tag> {
    return this.tagsService.createTag(tagDto);
  }

  @Delete(':id')
  @Roles('admin')
  removeTag(@Param('id', new ParseIntPipe()) id: number): Promise<Tag> {
    return this.tagsService.removeTag(id);
  }
}
