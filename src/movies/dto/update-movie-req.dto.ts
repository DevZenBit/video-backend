import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMovieReqDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file: any;

  @ApiProperty({ example: 'The Lord of the Rings', required: false })
  title: string;

  @ApiProperty({ example: 1977, required: false })
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  publishingYear: number;
}
