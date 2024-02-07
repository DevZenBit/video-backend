import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Movie } from 'src/movies/movie.entity';
import { MoviesModule } from 'src/movies/movies.module';
import { AuthModule } from 'src/auth/auth.module';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Movie]),
    MoviesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
