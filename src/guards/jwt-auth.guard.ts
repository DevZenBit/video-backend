import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { publicKey } from 'src/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      publicKey,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new UnauthorizedException({
          message: 'Authorization header not provided',
        });
      }

      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Invalid token format' });
      }

      req.user = this.jwtService.verify(token);

      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'User unauthorized' });
    }
  }
}
