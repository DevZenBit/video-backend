import { ApiProperty } from '@nestjs/swagger';
import { Movie } from 'src/movies/movie.entity';

export class GetMovieByIdRespDto {
  @ApiProperty({ type: Movie })
  movie: Movie;
}
