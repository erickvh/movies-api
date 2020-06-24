import { Controller, Get, Post, Delete, ParseIntPipe, Param, Body, Put } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  getMovies(): Promise<Array<Movie>> {
    return this.moviesService.getMovies();
  }

  @Get(':id')
  getMovie(@Param('id', new ParseIntPipe()) id: number): Promise<Movie> {
    return this.moviesService.getMovie(id);
  }

  @Post()
  createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.createMovie(createMovieDto);
  }

  @Put(':id')
  updateMovie(@Param('id', new ParseIntPipe()) id: number, @Body() updateMovieDto: UpdateMovieDto): Promise<Movie> {
    return this.moviesService.updateMovie(id, updateMovieDto);
  }

  @Delete(':id')
  removeMovie(@Param('id', new ParseIntPipe()) id: number): Promise<Movie> {
    return this.moviesService.removeMovie(id);
  }
}
