import { Module } from '@nestjs/common';
import { RentsService } from './rents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from 'src/movies/movies.module';
import { RentRepository } from './repositories/rents.repository';
import { RentDetail } from './entities/rent-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RentRepository, RentDetail]), MoviesModule],
  providers: [RentsService],
  exports: [RentsService],
})
export class RentsModule {}
