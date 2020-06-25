import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRepository } from './repositories/movies.repository';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TagsModule } from 'src/tags/tags.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieRepository]),
    TagsModule,
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
