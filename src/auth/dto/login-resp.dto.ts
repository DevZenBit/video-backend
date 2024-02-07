import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

export class LoginRespDto {
  @ApiProperty({ example: '_userTokenHere_' })
  authToken: string;

  @ApiProperty({ example: '_userTokenHere_' })
  refreshToken: string;

  @ApiProperty({ type: User })
  user: User;
}
