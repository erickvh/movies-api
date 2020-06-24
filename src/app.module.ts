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
        entities: [User, Tag, Movie, Rol],
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MoviesModule,
    AuthModule,
    UsersModule,
    TagsModule,
  ],
})
export class AppModule {}
