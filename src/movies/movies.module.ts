import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRepository } from './repositories/movies.repository';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRepository]), TagsModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
