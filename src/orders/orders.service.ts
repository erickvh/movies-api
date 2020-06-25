import { Injectable, BadRequestException } from '@nestjs/common';
import { Order } from './entities/orders.entity';
import { OrderRepository } from './repositories/orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { User } from 'src/users/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-details.entity';
import { Repository } from 'typeorm';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly orderRepository: OrderRepository,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {}
  getOrdersByUserId(id: number): Promise<Order[]> {
    return this.orderRepository.findByUserId(id);
  }

  containsDuplicatedMovies(orderDetails: CreateOrderDetailDto[]): boolean {
    const uniqueOrderDetails = [...new Set(orderDetails.map(orderDetail => orderDetail.movieId))];
    return orderDetails.length !== uniqueOrderDetails.length;
  }

  async checkStockAvailability(orderDetails: CreateOrderDetailDto[]): Promise<void> {
    const orderDetailsPromises = orderDetails.map(async orderDetail => {
      const movie = await this.moviesService.getMovie(orderDetail.movieId);
      if (movie.stock < orderDetail.quantity) {
        throw new BadRequestException(
          `There is not sufficient stock for the movie with id: ${movie.id}. Stock available: ${movie.stock}.`,
        );
      }
    });
    await Promise.all(orderDetailsPromises);
  }

  async adjustStock(orderDetails: CreateOrderDetailDto[]): Promise<void> {
    const orderDetailsPromises = orderDetails.map(async orderDetail => {
      const movie = await this.moviesService.getMovie(orderDetail.movieId);
      movie.stock = movie.stock - orderDetail.quantity;
      await this.moviesService.saveMovie(movie);
    });
    await Promise.all(orderDetailsPromises);
  }

  async addOrderToUser(user: User, createOrderDto: CreateOrderDto): Promise<Order> {
    if (this.containsDuplicatedMovies(createOrderDto.orderDetails)) {
      throw new BadRequestException('Each Order Detail should have different movies');
    }
    await this.checkStockAvailability(createOrderDto.orderDetails);
    let orderDetails = createOrderDto.orderDetails.map(orderDetail => ({
      ...orderDetail,
      subTotal: orderDetail.quantity * orderDetail.unitPrice,
    }));

    const total = orderDetails.reduce((acum, orderDetail) => acum + orderDetail.subTotal, 0);
    const order = {
      user,
      total,
      orderDetails: [],
    };
    const newOrder = await this.orderRepository.save(order);
    orderDetails = orderDetails.map(orderDetail => ({
      ...orderDetail,
      movie: orderDetail.movieId,
      subTotal: orderDetail.quantity * orderDetail.unitPrice,
      order: newOrder.id,
    }));
    const newOrderDetails = await this.orderDetailRepository.save(orderDetails);
    await this.adjustStock(createOrderDto.orderDetails);
    newOrder.orderDetails.push(...newOrderDetails);
    return this.orderRepository.save(newOrder);
  }
}
