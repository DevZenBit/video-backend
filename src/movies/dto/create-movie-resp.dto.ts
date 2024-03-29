import { ApiProperty } from '@nestjs/swagger';
import { Movie } from 'src/movies/movie.entity';

export class CreateMovieRespDto {
  @ApiProperty({ type: Movie })
  movie: Movie;
}
