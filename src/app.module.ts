import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import { TagsModule } from './tags/tags.module';
import { User } from './users/entities/users.entity';
import { Tag } from './tags/entities/tags.entity';
import { Movie } from './movies/entities/movies.entity';
import { Rol } from './auth/entities/roles.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/orders.entity';
import { OrderDetail } from './orders/entities/order-details.entity';
import { Rent } from './rents/entities/rents.entity';
import { Token } from './auth/entities/tokens.entity';
import { RentDetail } from './rents/entities/rent-details.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        port: configService.get<number>('PORT_DB'),
        username: configService.get('USER_DB'),
        password: configService.get('PASSWORD_DB'),
        database: configService.get('NAME_DB'),
        host: configService.get('HOST_DB'),
        synchronize: true,
        entities: [
          User,
          Tag,
          Movie,
          Rol,
          Order,
          OrderDetail,
          Rent,
          Token,
          RentDetail,
        ],
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MoviesModule,
    AuthModule,
    UsersModule,
    TagsModule,
    OrdersModule,
  ],
})
export class AppModule {}
