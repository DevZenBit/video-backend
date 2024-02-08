import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/users/user.entity';
import { FilesModule } from 'src/files/files.module';
import { UsersService } from 'src/users/users.service';

import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';
import { MoviesController } from './movies.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [MoviesService, UsersService],
  controllers: [MoviesController],
  imports: [
    TypeOrmModule.forFeature([Movie, User]),
    FilesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [MoviesService],
})
export class MoviesModule {}
