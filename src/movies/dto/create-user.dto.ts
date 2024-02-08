import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John', required: true })
  firstName: string;

  @ApiProperty({ example: 'Doe', required: true })
  lastName: string;

  @ApiProperty({ example: 'johndoe@example.com', required: true })
  email: string;

  @ApiProperty({ example: 'goodP#45ssword', required: true })
  password: string;
}
