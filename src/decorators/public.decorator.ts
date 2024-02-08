import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const publicKey = 'isPublic';

export const Public = (): CustomDecorator<string> =>
  SetMetadata(publicKey, true);
