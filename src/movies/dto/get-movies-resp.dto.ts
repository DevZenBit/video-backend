import { ApiProperty } from '@nestjs/swagger';
import { Movie } from 'src/movies/movie.entity';

export class GetMoviesRespDto {
  @ApiProperty({
    type: [Movie],
    example: [
      {
        id: 1,
        title: 'The Lord of the Rings',
        publishingYear: 2020,
        poster: 'poster.jpg',
      },
    ],
  })
  movies: Movie[];

  @ApiProperty({ example: 23 })
  totalCount: number;
}
