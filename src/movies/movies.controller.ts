import { Controller, Get, Post, Delete, ParseIntPipe, Param, Body, Put, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { SessionGuard } from 'src/auth/guards/session.guard';

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
  @UseGuards(AuthGuard('jwt'), SessionGuard, RolesGuard)
  @Roles('admin')
  createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.createMovie(createMovieDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), SessionGuard, RolesGuard)
  @Roles('admin')
  updateMovie(@Param('id', new ParseIntPipe()) id: number, @Body() updateMovieDto: UpdateMovieDto): Promise<Movie> {
    return this.moviesService.updateMovie(id, updateMovieDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), SessionGuard, RolesGuard)
  @Roles('admin')
  removeMovie(@Param('id', new ParseIntPipe()) id: number): Promise<Movie> {
    return this.moviesService.removeMovie(id);
  }
}
