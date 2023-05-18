import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

export interface TokenPayload {
  username?: string;
}

@Injectable()
export class TokenUserIdGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearer = request.headers.authorization;
    const decoded = this.jwtService.verify(bearer?.slice(7, bearer.length), {
      secret: '150',
    });
    return !!decoded;
  }
}
