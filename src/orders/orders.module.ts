import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './repositories/orders.repository';
import { OrderDetail } from './entities/order-details.entity';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderRepository, OrderDetail]), MoviesModule],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
