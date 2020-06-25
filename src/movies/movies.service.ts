import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieRepository } from './repositories/movies.repository';
import { Movie } from './entities/movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { TagsService } from 'src/tags/tags.service';

@Injectable()
export class MoviesService {
  constructor(private readonly movieRepository: MovieRepository, private readonly tagsService: TagsService) {}
  getMovies(): Promise<Array<Movie>> {
    return this.movieRepository.find({
      where: { isActive: true },
      order: {
        title: 'ASC',
      },
    });
  }

  async getMovie(id: number) {
    const movie = await this.movieRepository.findById(id);
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return movie;
  }

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const tags = await this.tagsService.findOrCreateTags(createMovieDto.tags);
    const movie = {
      ...createMovieDto,
      tags,
    };
    return this.movieRepository.save(movie);
  }

  async updateMovie(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const existingMovie = await this.getMovie(id);
    const movie = {
      ...existingMovie,
      ...updateMovieDto,
      tags: existingMovie.tags,
    };
    if (updateMovieDto.tags) {
      const tags = await this.tagsService.findOrCreateTags(updateMovieDto.tags);
      movie.tags = tags;
    }
    return this.movieRepository.save(movie);
  }

  saveMovie(movie: Movie): Promise<Movie> {
    return this.movieRepository.save(movie);
  }

  async removeMovie(id: number): Promise<Movie> {
    const movie = await this.getMovie(id);
    movie.isActive = false;
    return this.movieRepository.save(movie);
  }
}
