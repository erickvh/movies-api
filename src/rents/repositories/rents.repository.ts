import { EntityRepository, Repository } from 'typeorm';
import { Rent } from '../entities/rents.entity';

@EntityRepository(Rent)
export class RentRepository extends Repository<Rent> {
  async findByUserId(userId: number): Promise<Rent[]> {
    const rents = await this.createQueryBuilder('rent')
      .leftJoinAndSelect('rent.rentDetails', 'rentDetail')
      .leftJoinAndSelect('rentDetail.movie', 'movie')
      .where({ user: userId })
      .select(['rent', 'rentDetail', 'movie.id', 'movie.title'])
      .getMany();
    return rents;
  }
}
