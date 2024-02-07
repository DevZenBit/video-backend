import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/users/user.entity';
import { FilesModule } from 'src/files/files.module';

import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';

@Module({
  providers: [MoviesService],
  imports: [TypeOrmModule.forFeature([Movie, User]), FilesModule],
  exports: [MoviesService],
})
export class MoviesModule {}
