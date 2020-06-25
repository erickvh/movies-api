import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../entities/orders.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async findByUserId(userId: number): Promise<Order[]> {
    const orders = await this.createQueryBuilder('order')
      .leftJoinAndSelect('order.orderDetails', 'orderDetail')
      .leftJoinAndSelect('orderDetail.movie', 'movie')
      .where({ user: userId })
      .select(['order', 'orderDetail', 'movie.id', 'movie.title'])
      .getMany();
    return orders;
  }
}
