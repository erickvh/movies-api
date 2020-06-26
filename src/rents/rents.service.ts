import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Rent } from './entities/rents.entity';
import { RentRepository } from './repositories/rents.repository';
import { CreateRentDto } from './dto/create-rent.dto';
import { CreateRentDetailDto } from './dto/create-rent-detail.dto';
import { User } from 'src/users/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RentDetail } from './entities/rent-details.entity';
import { Repository } from 'typeorm';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class RentsService {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly rentRepository: RentRepository,
    @InjectRepository(RentDetail)
    private readonly rentDetailRepository: Repository<RentDetail>,
  ) {}

  getRentsByUserId(id: number): Promise<Rent[]> {
    return this.rentRepository.findByUserId(id);
  }

  async getRentByIdAndUser(id: number, user: User): Promise<Rent> {
    const rent = await this.rentRepository.findOne({
      relations: ['rentDetails'],
      where: { id, user, returned: false },
    });
    if (!rent) {
      throw new NotFoundException('Rent does not exist for the user specified or is already returned');
    }
    return rent;
  }

  async returnRentedMovie(rent: Rent): Promise<Rent> {
    const rentDetails = rent.rentDetails.map(rentDetail => ({
      ...rentDetail,
      movieId: rentDetail.movie.id,
    }));
    await this.adjustStock(rentDetails, true);
    rent.returned = true;
    return this.rentRepository.save(rent);
  }

  containsDuplicatedMovies(rentDetails: CreateRentDetailDto[]): boolean {
    const uniqueRentDetails = [...new Set(rentDetails.map(rentDetail => rentDetail.movieId))];
    return rentDetails.length !== uniqueRentDetails.length;
  }

  async checkStockAvailability(rentDetails: CreateRentDetailDto[]): Promise<void> {
    const rentDetailsPromises = rentDetails.map(async rentDetail => {
      const movie = await this.moviesService.getMovie(rentDetail.movieId);
      if (movie.stock < rentDetail.quantity) {
        throw new BadRequestException(
          `There is not sufficient stock for the movie with id: ${movie.id}. Stock available: ${movie.stock}.`,
        );
      }
    });
    await Promise.all(rentDetailsPromises);
  }

  async adjustStock(rentDetails: CreateRentDetailDto[], returned: boolean): Promise<void> {
    const rentDetailsPromises = rentDetails.map(async rentDetail => {
      const movie = await this.moviesService.getMovie(rentDetail.movieId);
      if (returned) {
        movie.stock = movie.stock + rentDetail.quantity;
      } else {
        movie.stock = movie.stock - rentDetail.quantity;
      }
      await this.moviesService.saveMovie(movie);
    });
    await Promise.all(rentDetailsPromises);
  }

  async addRentToUser(user: User, createRentDto: CreateRentDto): Promise<Rent> {
    if (new Date(createRentDto.returnDate) <= new Date()) {
      throw new BadRequestException('Return Date must be later than today. ');
    }
    if (this.containsDuplicatedMovies(createRentDto.rentDetails)) {
      throw new BadRequestException('Each Rent Detail must have different movies');
    }
    await this.checkStockAvailability(createRentDto.rentDetails);
    let rentDetails = createRentDto.rentDetails.map(rentDetail => ({
      ...rentDetail,
      subTotal: rentDetail.quantity * rentDetail.unitPrice,
    }));

    const total = rentDetails.reduce((acum, rentDetail) => acum + rentDetail.subTotal, 0);
    const rent = {
      user,
      returnDate: createRentDto.returnDate,
      total,
      rentDetails: [],
    };
    const newRent = await this.rentRepository.save(rent);
    rentDetails = rentDetails.map(rentDetail => ({
      ...rentDetail,
      movie: rentDetail.movieId,
      subTotal: rentDetail.quantity * rentDetail.unitPrice,
      rent: newRent.id,
    }));
    const newRentDetails = await this.rentDetailRepository.save(rentDetails);
    await this.adjustStock(createRentDto.rentDetails, false);
    newRent.rentDetails.push(...newRentDetails);
    return this.rentRepository.save(newRent);
  }
}
